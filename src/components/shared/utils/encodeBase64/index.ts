const encodeBase64 = (str: string): string => {
  return btoa(str);
};

const decodeBase64 = (encodedStr: string): string => {
  return atob(encodedStr);
};

export { encodeBase64, decodeBase64 };
