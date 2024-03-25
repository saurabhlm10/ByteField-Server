import { Prisma } from "@prisma/client";

interface Project {
  name: string;
  fileFolderId: string;
}

export interface ICreateProjectParams {
  name: string;
}

export interface IGetAllFileFoldersParams {
  projectId: string;
}

// Assuming you want to optionally connect a FileFolder to an existing Project when creating it
export interface ICreateFileFolderParams {
  name: string;
  isFolder: boolean;
  content?: string | null; // Optional, and can be null
  parentId?: string | null; // Optional, can be null for a root folder
  projectId?: string; // Optional, link to an existing Project by ID
}

export interface IGetProjectByIdParams {
  id: number;
}

export interface IUpdateProjectParams {
  id: number;
  projectData: Partial<Project>;
}

export type IDeleteProjectParams = IGetProjectByIdParams;

export interface IGetFileFolderByIdParams {
  id: string;
}

export interface IUpdateFileFolderParams {
  projectId: string;
  id: string;
  fileFolderData: Prisma.FileFolderUpdateInput;
}

export interface IDeleteFileFolderParams {
  projectId: string;
  id: string;
}
