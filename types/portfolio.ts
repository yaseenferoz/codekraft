export type ClientProject = {
  name: string;
  url: string;
  category: "aerospace" | "innovation" | "public-sector" | "commerce" | "wellness" | "hospitality" | "community" | "web";
  year: string;
  summary: string;
  services: string[];
  accent: "cyan" | "violet" | "blue";
};
