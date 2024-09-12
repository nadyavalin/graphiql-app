import { js_beautify } from "js-beautify";

export const formatDataEditor = (body: string) => {
  const nonEmptyLines = body.split("\n").filter((line) => line.trim() !== "");
  const cleanedBody = nonEmptyLines.join("\n");
  const formattedJson = js_beautify(cleanedBody, {
    indent_size: 4,
    space_in_empty_paren: true,
  });

  return formattedJson;
};
