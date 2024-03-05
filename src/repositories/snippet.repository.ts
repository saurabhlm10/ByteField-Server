import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SnippetRepository {
  async getAllSnippets() {
    return await prisma.snippet.findMany();
  }

  async createSnippet(snippet: Snippet) {
    return await prisma.snippet.create({
      data: snippet,
    });
  }

  async findSnippetById(snippetId: string) {
    return await prisma.snippet.findUnique({
      where: { id: parseInt(snippetId) },
    });
  }

  async updateSnippet(params: IUpdateSnippetParams) {
    const { snippetId, updateData } = params;

    return await prisma.snippet.update({
      where: { id: parseInt(snippetId) },
      data: updateData,
    });
  }

  async deleteSnippet(snippetId: string) {
    return await prisma.snippet.delete({
      where: { id: parseInt(snippetId) },
    });
  }
}
