export type ClientProject = {
  slug: string;
  name: string;
  url: string;
  category: "aerospace" | "innovation" | "public-sector" | "commerce" | "wellness" | "hospitality" | "community" | "web";
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  services: string[];
  stack: string[];
  metrics: [string, string][];
  accent: "cyan" | "violet" | "blue";
};
