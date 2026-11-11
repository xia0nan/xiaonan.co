export interface ProjectEntry {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  featured: boolean;
  format?: string;
  url?: string;
  repository?: string;
  demo?: string;
}

export const inferenceProject = {
  id: 'llm-inference',
  title: 'How an LLM generates a response',
  summary: 'Follow one prompt through request routing, prefill, and the decode loop. Watch the KV cache grow as the server streams the answer.',
  tags: ['LLM serving', 'Inference'],
  featured: true,
  format: 'Interactive explainer',
  url: '/projects/llm-inference/',
} satisfies ProjectEntry;

// Curated order; independent builds and experiments belong here.
export const projects: ProjectEntry[] = [inferenceProject];
