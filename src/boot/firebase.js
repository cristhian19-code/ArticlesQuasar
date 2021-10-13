import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"
import "firebase/auth"
import { Store } from "src/store";

var firebaseConfig = {
  apiKey: "AIzaSyBZS7liUh0J162KdlZy1PVxVlDKAkfGosM",
  authDomain: "articlesapp-18ee2.firebaseapp.com",
  projectId: "articlesapp-18ee2",
  storageBucket: "articlesapp-18ee2.appspot.com",
  messagingSenderId: "742312267680",
  appId: "1:742312267680:web:3aff4647433bf8f5131ec5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

auth.onAuthStateChanged(async (user) => {
  const user_ls = localStorage.getItem('user');

  if (user_ls) {
    await Store.dispatch('Article/GetUser', JSON.parse(user_ls))
  } else {
    await Store.dispatch('Article/GetUser', null);
  }
})


export {
  db,
  firebase,
  storage,
  auth
}