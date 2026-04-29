export interface Project {
  title: string;
  description?: string;
  website?: string;
  github?: string;
  thumbnail?: string;
  tags?: Array<{ label: string }>;
  // thumbnail: string;
}
