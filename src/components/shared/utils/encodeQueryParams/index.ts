const encodeQueryParams = (headers: { [key: string]: string }): string => {
  const encodedHeaders = Object.entries(headers)
    .filter((value) => value[0].trim() !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return encodedHeaders;
};

export default encodeQueryParams;
