export const isTokenValid = (dateToken: string) => {
  const currentDate = Date.now();
  const timeExpiresToken = 3600 * 1000;
  const timeLogin = new Date(dateToken).getTime();

  if (isNaN(timeLogin)) return false;
  if (timeLogin > currentDate) return false;
  if (timeLogin + timeExpiresToken > currentDate) return true;

  return false;
};
