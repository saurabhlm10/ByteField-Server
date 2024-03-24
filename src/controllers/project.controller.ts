import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";

const projectService = new ProjectService();

export const createProject = async (req: Request, res: Response) => {
  const { name } = req.body;

  const project = await projectService.createProject({ name });

  return { result: project, status: 201 };
};

export const getProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await projectService.getProject({ id: parseInt(id) });
  res.json(project);
};

export const getProjects = async (req: Request, res: Response) => {
  const projects = await projectService.getProjects();

  return { result: projects };
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedProject = await projectService.updateProject({
    id: parseInt(id),
    projectData: req.body,
  });
  return { result: updatedProject };
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  await projectService.deleteProject({ id: parseInt(id) });

  return { status: 204 };
};
