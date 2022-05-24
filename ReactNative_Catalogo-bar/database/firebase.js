import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDdhS1MnL2-kZyBSjVU214ftaQ0prWqsKE",
  authDomain: "lucas-nt2.firebaseapp.com",
  databaseURL: "https://lucas-nt2-default-rtdb.firebaseio.com",
  projectId: "lucas-nt2",
  storageBucket: "lucas-nt2.appspot.com",
  messagingSenderId: "844601382374",
  appId: "1:844601382374:web:f718efc9d55840f5cb7227",
  measurementId: "G-36XWGXPBKC"
};
/*
var firebaseConfig = {
  apiKey: "AIzaSyC152jgnlM-wSgg6ktpGh3KD0I0DiDJeKc",
  authDomain: "mi-menu-94512.firebaseapp.com",
  databaseURL: "https://mi-menu-94512.firebaseio.com",
  projectId: "mi-menu-94512",
  storageBucket: "mi-menu-94512.appspot.com",
  messagingSenderId: "944013644517",
  appId: "1:944013644517:web:56421494ae30ac99e7ba0c"
};*/



// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const st = firebase.storage()
const producto = 'productos'

export default {
  firebase,
  db,
  st,
  producto
};

export {
  firebase,
  db,
  st,
  producto
};

/*
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC152jgnlM-wSgg6ktpGh3KD0I0DiDJeKc",
    authDomain: "mi-menu-94512.firebaseapp.com",
    databaseURL: "https://mi-menu-94512.firebaseio.com",
    projectId: "mi-menu-94512",
    storageBucket: "mi-menu-94512.appspot.com",
    messagingSenderId: "944013644517",
    appId: "1:944013644517:web:56421494ae30ac99e7ba0c"
  };
  
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const st = firebase.storage()
const producto = 'productos'

export {
  db, 
  firebase
}

export default {
  firebase,
  db,
  st,
  producto
};*/