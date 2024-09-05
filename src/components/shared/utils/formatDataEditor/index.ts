import { js_beautify } from "js-beautify";

export const formatDataEditor = (body: string) => {
  try {
    const formattedJson = js_beautify(body, { indent_size: 4, space_in_empty_paren: true });
    return formattedJson;
  } catch (err) {
    console.log(err);
    return "";
  }
};
