export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: 'Client' | 'Personal';
  tagline: string;
  description: string;
  year: string;
  tools: string[];
  images: {
    col1Top: string;
    col1Bottom: string;
    col2Tall: string;
  };
  liveUrl: string;
}

export interface ServiceItem {
  number: string;
  name: string;
  description: string;
  tags?: string[];
}
