import { getDictionary } from "@src/app/[lang]/dictionaries";

export enum Languages {
  EN = "en",
  RU = "ru",
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
