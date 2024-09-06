import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8Xy7_dyxfZiELnM23Pw6eHiQ4_sePVGc",
  authDomain: "graphiql-app-project-9e22e.firebaseapp.com",
  projectId: "graphiql-app-project-9e22e",
  storageBucket: "graphiql-app-project-9e22e.appspot.com",
  messagingSenderId: "869269762459",
  appId: "1:869269762459:web:9ae191fe1dfbd4985df13e",
  measurementId: "G-4BB3FXME1V",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
