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

export interface AIProjectItem {
  id: string;
  number: string;
  title: string;
  category: 'Agentic Workflows' | 'LLM Pipelines & RAG' | 'Computer Vision' | 'Autonomous Systems';
  tagline: string;
  outcome: string;
  description: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface DomainItem {
  id: string;
  number: string;
  name: string;
  tag: string;
  focus: string;
  description: string;
  technologies: string[];
  capability: string;
}

export interface ServiceItem {
  number: string;
  name: string;
  description: string;
  tags?: string[];
}
