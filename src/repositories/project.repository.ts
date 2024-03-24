import { PrismaClient } from "@prisma/client";
import {
  ICreateProjectParams,
  IDeleteProjectParams,
  IGetProjectByIdParams,
  IUpdateProjectParams,
} from "../types/project.type";
import CustomError from "../utils/customError.util";

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

      // Create the root FileFolder
      const rootFolder = await tx.fileFolder.create({
        data: {
          name: name,
          isFolder: true,
          content: null,
          parentId: null,
        },
      });

      // Create the Project and link it to the root folder
      const project = await tx.project.create({
        data: {
          name: name,
          fileFolderId: rootFolder.id,
        },
      });

      return project;
    });
  }

  async getProjectById(data: IGetProjectByIdParams) {
    return prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: { id: data.id },
        include: { fileFolder: true },
      });

      if (!project) {
        throw new CustomError(`Project doesn't exist.`, 404);
      }

      return await prisma.project.findUnique({
        where: { id: data.id },
        include: { fileFolder: true },
      });
    });
  }

  async getAllProjects() {
    return prisma.project.findMany({
      include: { fileFolder: true },
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
      const existingProject = await tx.project.findFirst({
        where: {
          name: data.projectData.name,
        },
      });

      if (existingProject) {
        throw new CustomError(
          `Project with name '${data.projectData.name}' already exists.`,
          400
        );
      }

      return await tx.project.update({
        where: { id: data.id },
        data: data.projectData,
      });
    });
  }

  async deleteProject(data: IDeleteProjectParams) {
    return prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: { id: data.id },
        include: { fileFolder: true },
      });

      if (!project) {
        throw new CustomError(`Project doesn't exist.`, 404);
      }

      return await prisma.project.delete({
        where: { id: data.id },
      });
    });
  }
}
