import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import "firebase/compat/firestore"
import { getAuth } from "firebase/auth";

export const app = firebase.initializeApp({
  "projectId": "fir-multimedia-storage",
  "appId": "1:1090037862392:web:5dba6283846359f90f100d",
  "storageBucket": "fir-multimedia-storage.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyB1OXbCUdbzBdZpdL1c8jpEMsoFxtPidjk",
  "authDomain": "fir-multimedia-storage.firebaseapp.com",
  "messagingSenderId": "1090037862392",
  "measurementId": "G-00ML9HQ5WS"
});

export const auth = getAuth(app);

const db = firebase.firestore();
export default db;
