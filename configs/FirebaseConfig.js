import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDsBc_VGYDmgRhTcncBfaL1yJs5mH_Dk0k",
  authDomain: "farmernotebookapp.firebaseapp.com",
  projectId: "farmernotebookapp",
  storageBucket: "farmernotebookapp.appspot.com",
  messagingSenderId: "943693527691",
  appId: "1:943693527691:web:d1b1eec7f96ce0d500f28e",
  measurementId: "G-04JKMQXQEF"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'it';
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

