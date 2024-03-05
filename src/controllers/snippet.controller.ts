import { Request, Response } from "express";
import { SnippetService } from "../services/snippet.service";

const snippetService = new SnippetService();

export const createSnippet = async (req: Request, res: Response) => {
  const snippet = await snippetService.createSnippet(req.body);
  return { result: snippet, status: 201 };
};

export const getSnippetById = async (req: Request, res: Response) => {
  const snippet = await snippetService.getSnippetById(req.params.id);
  return { result: snippet };
};

export const getAllSnippets = async (req: Request, res: Response) => {
  const snippets = await snippetService.getAllSnippets();
  return { result: snippets };
};

export const updateSnippet = async (req: Request, res: Response) => {
  const params: IUpdateSnippetParams = {
    snippetId: req.params.id,
    updateData: req.body,
  };
  const updatedSnippet = await snippetService.updateSnippet(params);
  return { result: updatedSnippet };
};

export const deleteSnippet = async (req: Request, res: Response) => {
  const deletedSnippet = await snippetService.deleteSnippet(req.params.id);
  return { result: deletedSnippet, status: 204 };
};
