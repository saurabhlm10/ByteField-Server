interface Snippet {
  name: string;
  code: string;
}

interface IUpdateSnippetParams {
  snippetId: string;
  updateData: Partial<Snippet>;
}
