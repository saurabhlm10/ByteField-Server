import { PrismaClient } from "@prisma/client";
import CustomError from "../utils/customError.util";
import {
  ICreateProjectParams,
  IDeleteProjectParams,
  IGetProjectByIdParams,
  IUpdateProjectParams,
} from "../types/project.type";

const prisma = new PrismaClient();

export class ProjectRepository {
  async createProject(data: ICreateProjectParams) {
    return prisma.$transaction(async (tx) => {
      const name = data.name.trim();
      // Check if a project with the given name already exists
      const existingProject = await tx.project.findFirst({
        where: {
          name: name,
        },
      });

      if (existingProject) {
        throw new CustomError(
          `Project with name '${name}' already exists.`,
          400
        );
      }

      // Create the Project first without linking the rootFolderId
      const project = await tx.project.create({
        data: {
          name: name,
          rootFolderId: null,
          // rootFolderId is omitted here and will be updated later
        },
      });

      // Then, create the root FileFolder and ensure it is linked to the newly created Project
      const rootFolder = await tx.fileFolder.create({
        data: {
          name: name, // Or specify a name for the root folder
          isFolder: true,
          content: null,
          parentId: null,
          projectId: project.id, // Link the folder to the project
        },
      });

      // Finally, update the Project to set the rootFolderId with the ID of the newly created FileFolder
      const updatedProject = await tx.project.update({
        where: { id: project.id },
        data: { rootFolderId: rootFolder.id },
        include: {
          rootFolder: {
            include: {
              children: true,
              project: true,
            },
          },
        },
      });

      return updatedProject;
    });
  }

  async getProjectById(data: IGetProjectByIdParams) {
    async function getFileFolderWithChildren(
      tx: PrismaClient,
      id: string,
      isFolder: boolean
    ) {
      const fileFolder = await tx.fileFolder.findUnique({
        where: { id },
        include: { children: isFolder },
      });

      if (!fileFolder) {
        throw new Error(`FileFolder with ID ${id} not found`);
      }

      if (fileFolder.isFolder) {
        for (let i = 0; i < fileFolder.children.length; i++) {
          fileFolder.children[i] = await getFileFolderWithChildren(
            tx,
            fileFolder.children[i].id,
            fileFolder.children[i].isFolder
          );
        }
      }

      return fileFolder;
    }

    return prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: { id: data.id },
        include: { rootFolder: true },
      });

      if (!project) {
        throw new CustomError(`Project doesn't exist.`, 404);
      }

      const rootFolder = await getFileFolderWithChildren(
        tx as PrismaClient,
        project.rootFolderId as string,
        true
      );

      project.rootFolder = rootFolder;

      return project;
    });
  }

  async getAllProjects() {
    return prisma.project.findMany({
      include: { rootFolder: true }, // Adjusted to include the rootFolder
    });
  }

  async updateProject(data: IUpdateProjectParams) {
    return prisma.$transaction(async (tx) => {
      // Find if project exists
      const project = await tx.project.findUnique({
        where: { id: data.id },
      });

      if (!project) {
        throw new CustomError(`Project doesn't exist.`, 404);
      }

      // Check if name is taken
      const existingProjectWithName = await tx.project.findFirst({
        where: {
          name: data.projectData.name,
          NOT: { id: data.id }, // Exclude current project from the check
        },
      });

      if (existingProjectWithName) {
        throw new CustomError(
          `Project with name '${data.projectData.name}' already exists.`,
          400
        );
      }

      // Update project
      return tx.project.update({
        where: { id: data.id },
        data: data.projectData,
      });
    });
  }

  async deleteProject(data: IDeleteProjectParams) {
    return prisma.$transaction(async (tx) => {
      // Ensure the project exists
      const project = await tx.project.findUnique({
        where: { id: data.id },
      });

      if (!project) {
        throw new CustomError(`Project doesn't exist.`, 404);
      }

      // Delete all FileFolders associated with the project
      // This includes the root folder and potentially other folders linked through projectId
      await tx.fileFolder.deleteMany({
        where: { projectId: data.id },
      });

      // Now that FileFolders are deleted, it's safe to delete the Project
      await tx.project.delete({
        where: { id: data.id },
      });
    });
  }
}
