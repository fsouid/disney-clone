import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBgAd9U1x6h0cz2rmZOBBhXrECGxG5DjnI",
  authDomain: "disneyplus-clone-5f8a8.firebaseapp.com",
  projectId: "disneyplus-clone-5f8a8",
  storageBucket: "disneyplus-clone-5f8a8.firebasestorage.app",
  messagingSenderId: "1068262212723",
  appId: "1:1068262212723:web:bcdd977f15bb0810a41606",
  measurementId: "G-NVDF5F09KQ"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;