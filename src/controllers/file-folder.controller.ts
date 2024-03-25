import { Request, Response } from "express";
import { FileFolderService } from "../services/file-folder.service";

const fileFolderService = new FileFolderService();

export const createFileFolder = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const data = req.body;

  data.name = data.name.trim();
  const fileFolder = await fileFolderService.createFileFolder({
    ...data,
    projectId,
  });
  return { result: fileFolder, status: 201 };
};

export const getFileFolder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fileFolder = await fileFolderService.getFileFolder({ id });

  return { result: fileFolder };
};

export const getAllFileFolders = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const fileFolders = await fileFolderService.getAllFileFolders({ projectId });
  return { result: fileFolders };
};

export const updateFileFolder = async (req: Request, res: Response) => {
  const { projectId, id } = req.params;
  const data = req.body;
  const updatedFileFolder = await fileFolderService.updateFileFolder({
    projectId,
    id,
    fileFolderData: data,
  });

  return { result: updatedFileFolder };
};

export const deleteFileFolder = async (req: Request, res: Response) => {
  const { projectId, id } = req.params;
  await fileFolderService.deleteFileFolder({ projectId, id });

  return { status: 204 };
};
