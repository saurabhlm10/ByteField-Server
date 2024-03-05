import { SnippetRepository } from "../repositories/snippet.repository";
import CustomError from "../utils/customError.util";

export class SnippetService {
  private snippetRepository = new SnippetRepository();

  async createSnippet(snippet: Snippet) {
    const createdSnippet = await this.snippetRepository.createSnippet(snippet);

    return createdSnippet;
  }

  async getSnippetById(snippetId: string) {
    const snippet = await this.snippetRepository.findSnippetById(snippetId);
    if (!snippet) {
      throw new CustomError("Snippet Not Found", 404);
    }

    return snippet;
  }

  async getAllSnippets() {
    const snippets = await this.snippetRepository.getAllSnippets();

    return snippets;
  }

  async updateSnippet(params: IUpdateSnippetParams) {
    const updatedSnippet = await this.snippetRepository.updateSnippet(params);

    return updatedSnippet;
  }

  async deleteSnippet(snippetId: string) {
    const deletedSnippet = await this.snippetRepository.deleteSnippet(
      snippetId
    );

    return deletedSnippet;
  }
}
