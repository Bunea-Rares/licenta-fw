import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");
export const saveToken = (token: string) =>
  localStorage.setItem("token", token);
export const deleteToken = () => localStorage.removeItem("token");
export const isAdmin = () => {
  const token = getToken();
  if (token) {
    return jwtDecode(token)[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ].includes("admin");
  }
  return false;
};
export const isOwner = () =>{
    const token = getToken();
    if (token) {
      return jwtDecode(token)[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ].includes("owner");
    }
    return false;
}

export const getUserId = () => {
  const token = getToken();
  return parseInt(jwtDecode(token).id)
}