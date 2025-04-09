import { User } from "../firebaseFunctions/db";

const getCurrentUserFromStorage = () => {
   const localUserString = localStorage.getItem("currentUser");
   if (!localUserString) return null;
   return JSON.parse(localUserString) as User;
};
export { getCurrentUserFromStorage };
