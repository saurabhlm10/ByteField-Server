import { ProjectRepository } from "../repositories/project.repository";
import {
  ICreateProjectParams,
  IDeleteProjectParams,
  IGetProjectByIdParams,
  IUpdateProjectParams,
} from "../types/project.type";

export class ProjectService {
  private projectRepository = new ProjectRepository();

  async createProject(project: ICreateProjectParams) {
    const createdProject = await this.projectRepository.createProject(project);

    return createdProject;
  }

  async getProject(data: IGetProjectByIdParams) {
    return this.projectRepository.getProjectById(data);
  }

  async getProjects() {
    return this.projectRepository.getAllProjects();
  }

  async updateProject(data: IUpdateProjectParams) {
    return this.projectRepository.updateProject(data);
  }

  async deleteProject(data: IDeleteProjectParams) {
    return this.projectRepository.deleteProject(data);
  }
}
