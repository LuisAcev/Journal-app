//import firebase from "firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";
import 'firebase/firestore';
import 'firebase/auth'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAczPGZG1mm9UcdU3NsqGyx5zzum_5tmWc",
  authDomain: "react-app-cursp-5bc0f.firebaseapp.com",
  projectId: "react-app-cursp-5bc0f",
  storageBucket: "react-app-cursp-5bc0f.appspot.com",
  messagingSenderId: "273179129017",
  appId: "1:273179129017:web:212c533eac81220ea11768"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // esta es la base de datos 

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app); // referencia a firestore
const auth = getAuth(app);
const googleAuthProvider = new  GoogleAuthProvider(); //auth provider pára hacer autenticaicon con google 

export {

    db,
    googleAuthProvider,
    app,
    auth

}