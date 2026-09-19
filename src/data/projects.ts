export interface ProjectEntry {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  featured: boolean;
  url?: string;
  repository?: string;
  demo?: string;
}

// Curated order; independent builds and experiments belong here.
export const projects: ProjectEntry[] = [];
