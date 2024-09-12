const encodeQueryParams = (headers: { [key: string]: string }): string => {
  const encodedHeaders = Object.entries(headers)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return encodedHeaders;
};

export default encodeQueryParams;
