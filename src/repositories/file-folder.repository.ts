import { PrismaClient } from "@prisma/client";
import CustomError from "../utils/customError.util";
import {
  ICreateFileFolderParams,
  IDeleteFileFolderParams,
  IGetAllFileFoldersParams,
  IGetFileFolderByIdParams,
  IUpdateFileFolderParams,
} from "../types/project.type";

const prisma = new PrismaClient();

export class FileFolderRepository {
  async createFileFolder(data: ICreateFileFolderParams) {
    const { projectId, ...rest } = data;

    return prisma.$transaction(async (tx) => {
      // Check if the project exists
      const project = await tx.project.findUnique({
        where: { id: parseInt(projectId as string) },
      });

      console.log("project", project);

      if (!project) {
        throw new CustomError("Project not found", 404);
      }

      // Check if the parent folder exists in the project
      if (rest.parentId) {
        const parentFolder = await tx.fileFolder.findFirst({
          where: {
            id: rest.parentId,
            // The following condition is adjusted since the relation is directly with projectId now
            projectId: parseInt(projectId as string),
          },
        });
        console.log("projectId", projectId);
        console.log("parentFolder", parentFolder);
        console.log("rest.parentId", rest.parentId);

        if (!parentFolder) {
          throw new CustomError("Parent folder not found", 404);
        }
      }

      // Check if a file or folder with the same name exists in the parent folder
      if (rest.parentId) {
        const existingFileFolder = await tx.fileFolder.findFirst({
          where: {
            name: rest.name,
            parentId: rest.parentId,
          },
        });

        if (existingFileFolder) {
          throw new CustomError(
            "File or folder with the same name already exists",
            400
          );
        }
      }

      // Create the FileFolder and directly associate it with the Project using projectId
      const fileFolder = await prisma.fileFolder.create({
        data: {
          ...rest,
          projectId: parseInt(projectId as string), // Directly set projectId here
        },
        include: {
          children: true,
          project: true,
        },
      });

      return fileFolder;
    });
  }

  async getFileFolderById(data: IGetFileFolderByIdParams) {
    const { id } = data;
    return prisma.fileFolder.findUnique({
      where: { id },
      include: { children: true, project: true },
    });
  }

  async getAllFileFolders(data: IGetAllFileFoldersParams) {
    const { projectId } = data;
    return prisma.$transaction(async (tx) => {
      const project = await tx.project.findUnique({
        where: { id: parseInt(data.projectId) },
      });

      if (!project) {
        throw new CustomError("Project not found", 404);
      }

      return tx.fileFolder.findMany({
        where: {
          project: {
            id: {
              equals: parseInt(projectId as string),
            },
          },
        },
        include: { children: true },
      });
    });
  }

  async updateFileFolder(data: IUpdateFileFolderParams) {
    const { projectId, id, fileFolderData } = data;

    return prisma.$transaction(async (tx) => {
      // Check if project exists and this fileFolder belongs to it
      const fileFolder = await tx.fileFolder.findFirst({
        where: {
          id,
          project: {
            id: {
              equals: parseInt(projectId as string),
            },
          },
        },
      });

      if (!fileFolder) {
        throw new CustomError("FileFolder not found", 404);
      }

      if (fileFolderData.name) {
        // Check if fileFolder with same exists in the parent folder
        const existingFileFolder = await tx.fileFolder.findFirst({
          where: {
            name: fileFolderData.name as string,
            parentId: fileFolder.parentId,
          },
        });

        if (existingFileFolder) {
          throw new CustomError(
            "File or folder with the same name already exists in this folder",
            400
          );
        }
      }

      return tx.fileFolder.update({
        where: { id },
        data: fileFolderData,
      });
    });
  }
  async deleteFileFolder(data: IDeleteFileFolderParams) {
    const { id } = data;

    return prisma.$transaction(async (tx) => {
      // Recursive function to delete child folders
      const deleteChildren = async (parentId: string) => {
        const children = await tx.fileFolder.findMany({ where: { parentId } });
        for (const child of children) {
          await deleteChildren(child.id); // Recursively delete children
          await tx.fileFolder.delete({ where: { id: child.id } });
        }
      };

      // Check if the fileFolder exists
      const fileFolderExists = await tx.fileFolder.findUnique({
        where: { id },
      });
      if (!fileFolderExists) {
        throw new CustomError("FileFolder not found", 404);
      }

      // Delete all children of the folder
      await deleteChildren(id);

      // Finally, delete the folder itself
      return tx.fileFolder.delete({ where: { id } });
    });
  }
}
