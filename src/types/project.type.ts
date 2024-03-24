import { Prisma } from "@prisma/client";

interface Project {
  name: string;
  fileFolderId: string;
}

export interface ICreateProjectParams {
  name: string;
}

export interface ICreateFileFolderParams {
  name: string;
  isFolder: boolean;
  project: Project;
  children: [];
}

export interface IGetProjectByIdParams {
  id: number;
}

export interface IUpdateProjectParams {
  id: number;
  projectData: Partial<Project>;
}

export type IDeleteProjectParams = IGetProjectByIdParams;
