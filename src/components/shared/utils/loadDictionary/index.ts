import en from "@public/dictionaries/en.json";
import ru from "@public/dictionaries/ru.json";

export const loadDictionary = (lang: string) => {
  switch (lang) {
    case "ru":
      return ru;
    case "en":
    default:
      return en;
  }
};
