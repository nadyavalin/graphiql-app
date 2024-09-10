export const isTokenValid = (dateToken: string) => {
  const currentDate = Date.now();
  const timeExpiresToken = 60000 * 1000;
  const timeLogin = new Date(dateToken).getTime();

  if (timeLogin) {
    const loginTimestamp = new Date(timeLogin).getTime();
    if (loginTimestamp + timeExpiresToken > currentDate) {
      return true;
    }
  }

  return false;
};
