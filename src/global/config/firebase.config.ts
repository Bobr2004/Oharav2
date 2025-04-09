import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyApMa2L7cL2b7AejTd2DuWWiMaC2OSwUko",
   authDomain: "ohara-88f08.firebaseapp.com",
   projectId: "ohara-88f08",
   storageBucket: "ohara-88f08.firebasestorage.app",
   messagingSenderId: "279661833864",
   appId: "1:279661833864:web:e2035bc71874bc7c03393d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
