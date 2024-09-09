export const isTokenValid = () => {
  const currentDate = Date.now();
  const timeExpiresToken = 3600 * 1000;
  const timeLogin = localStorage.getItem("loginTime");

  if (timeLogin) {
    const loginTimestamp = new Date(timeLogin).getTime();
    if (loginTimestamp + timeExpiresToken > currentDate) {
      return true;
    }
  }

  return false;
};
