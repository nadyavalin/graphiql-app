import en from "@public/dictionaries/en.json";
import ru from "@public/dictionaries/ru.json";

export const LoadDictionary = (lang: string) => {
  switch (lang) {
    case "ru":
      return ru;
    case "en":
    default:
      return en;
  }
};
