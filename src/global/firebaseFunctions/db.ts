import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

type User = {
   id: string;
   name: string;
   photoURL: string;
   email: string;
   role: "ADMIN" | "USER";
};

const userRef = (id: string) => doc(db, "users", id);

const createNewUser = async (user: User) => {
   const { id, ...userCredentials } = user;
   await setDoc(userRef(user.id), userCredentials);
};

// const updateUser = async (user: User) => {};
// const deleteUser = async (userId: string) => {};
// const getUser = async (userId: string) => {};

const getAllUsers = async () => {
   const querySnapshot = await getDocs(collection(db, "users"));
   const users = querySnapshot.docs.map(
      (doc) =>
         ({
            id: doc.id,
            ...doc.data()
         } as User)
   );
   return users;
};

export type { User };

export { createNewUser, getAllUsers };
