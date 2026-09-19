export interface WorkEntry {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  featured: boolean;
  url?: string;
  organization?: string;
  role?: string;
  period?: string;
  contribution?: string;
}

// Curated order; professional contributions belong here.
export const work: WorkEntry[] = [];
