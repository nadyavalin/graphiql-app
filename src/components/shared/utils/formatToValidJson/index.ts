const fixInvalidJson = (invalidJson: string) => {
  if (!invalidJson.trim().startsWith("{") || !invalidJson.trim().endsWith("}")) {
    invalidJson = `{${invalidJson}}`;
  }
  const fixedJson = invalidJson
    .replace(/([a-zA-Z0-9_]+):/g, '"$1":')
    .replace(/:\s*([a-zA-Z0-9_]+)/g, ':"$1"');

  return fixedJson;
};

export default fixInvalidJson;
