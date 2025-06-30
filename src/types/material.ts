import { Media } from "@/payload-types";

export interface Material {
  id: string;
  title: string;
  content?: string;
  file?: number | Media;
  classroom: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
