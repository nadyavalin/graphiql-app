import { getDictionary } from "@app/[lang]/dictionaries";

export enum Languages {
  EN = "en",
  RU = "ru",
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export interface FormData {
  email: string;
  password: string;
  passwordMatch: string;
}
