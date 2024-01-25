import { getCookie } from "cookies-next";

export const getAuthenticateUserInfo = () => {
  const jsonStr = getCookie("adminCredential");
  if (jsonStr != null) {
    const obj = JSON.parse(jsonStr);
    return obj;
  }
};
