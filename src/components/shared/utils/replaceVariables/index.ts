import { Item } from "@shared/store/model";

function replaceVariables(text: string, variables: Item[]): string {
  return text.replace(/{{\s*([\w]+)\s*}}/g, (match, varName) => {
    const variable = variables.find((v) => v.key === varName);

    if (variable) {
      return '"' + variable.value + '"';
    }

    return match;
  });
}

export default replaceVariables;
