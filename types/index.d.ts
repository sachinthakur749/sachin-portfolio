export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
