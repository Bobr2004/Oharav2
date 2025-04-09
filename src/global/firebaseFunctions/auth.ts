import {
   getAdditionalUserInfo,
   GoogleAuthProvider,
   signInWithPopup,
   signOut
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { createNewUser, User } from "./db";

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
   try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userUnfo: User = {
         id: user.uid,
         name: user.displayName || "",
         email: user.email || "",
         photoURL: user.photoURL || "",
         role: "USER"
      };
      const { isNewUser } = getAdditionalUserInfo(result) as any;
      if (isNewUser) {
         await createNewUser(userUnfo);
      }
      return userUnfo;
   } catch (error) {
      console.error("Error signing in with Google", error);
   }
};

const logOut = async () => {
   try {
      await signOut(auth);
   } catch (error) {
      console.error("Error signing in with Google", error);
   }
};

export { signInWithGoogle, logOut };
