import {
   addDoc,
   collection,
   doc,
   getDoc,
   getDocs,
   setDoc
} from "firebase/firestore";
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
   try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = querySnapshot.docs.map(
         (doc) =>
            ({
               id: doc.id,
               ...doc.data()
            } as User)
      );
      return users;
   } catch (err) {
      console.log("Error retrieving users");
   }
};

export type { User };

export { createNewUser, getAllUsers };

type Book = {
   id: string;
   name: string;
   author?: string;
   pdfURL: string;
   coverURL: string;
};

type BookToUpload = Omit<Book, "id">;

const createPdfBook = async (book: BookToUpload) => {
   try {
      await addDoc(collection(db, "books"), book);
   } catch (err) {
      console.log("Error creating pdf");
   }
};

const getAllBooks = async () => {
   try {
      const querySnapshot = await getDocs(collection(db, "books"));
      const books = querySnapshot.docs.map(
         (doc) =>
            ({
               id: doc.id,
               ...doc.data()
            } as Book)
      );
      return books;
   } catch (err) {
      console.log("Error retrieving pdfs");
   }
};

const getBookById = async (id: string) => {
   try {
      const book = await getDoc(doc(db, "books", id));
      return book.data() as Book;
   } catch (err) {
      console.log("Error retrieving pdfs");
   }
};

export { createPdfBook, getAllBooks, getBookById };
export type { Book };
