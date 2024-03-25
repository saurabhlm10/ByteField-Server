import { FileFolderRepository } from "../repositories/file-folder.repository";
import {
  ICreateFileFolderParams,
  IDeleteFileFolderParams,
  IGetAllFileFoldersParams,
  IGetFileFolderByIdParams,
  IUpdateFileFolderParams,
} from "../types/project.type";
import CustomError from "../utils/customError.util";

export class FileFolderService {
  private fileFolderRepository = new FileFolderRepository();

  async createFileFolder(data: ICreateFileFolderParams) {
    return this.fileFolderRepository.createFileFolder(data);
  }

  async getFileFolder(data: IGetFileFolderByIdParams) {
    const fileFolder = await this.fileFolderRepository.getFileFolderById({
      id: data.id,
    });

    console.log("fileFolder", fileFolder);

    if (!fileFolder) {
      throw new CustomError("File or folder not found", 404);
    }
    return fileFolder;
  }

  async getAllFileFolders(data: IGetAllFileFoldersParams) {
    return this.fileFolderRepository.getAllFileFolders(data);
  }

  async updateFileFolder(data: IUpdateFileFolderParams) {
    return this.fileFolderRepository.updateFileFolder(data);
  }

  async deleteFileFolder(data: IDeleteFileFolderParams) {
    return this.fileFolderRepository.deleteFileFolder(data);
  }
}
