export interface ClientProject {
  title: string;
  description?: string;
  industry?: string;
  role?: string;
  thumbnail?: string;
  tags?: Array<{ label: string }>;
}
