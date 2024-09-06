const encodeQueryParams = (headers: { [key: string]: string }): string => {
  const encodedHeaders = Object.entries(headers)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
  return encodedHeaders;
};

export default encodeQueryParams;
