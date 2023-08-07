import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
const firebaseConfig = {
    apiKey: "AIzaSyD1P5w1a9NibKqPek9HjSIExMGMeHkEt8w",
    authDomain: "threadspccoe.firebaseapp.com",
    projectId: "threadspccoe",
    storageBucket: "threadspccoe.appspot.com",
    messagingSenderId: "656128207339",
    appId: "1:656128207339:web:8b9ae458619edb3e7b51ae",
    measurementId: "G-QSDC3HJY2F"
  };
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const app = initializeApp(firebaseConfig);
  
  
  export default firebase;

