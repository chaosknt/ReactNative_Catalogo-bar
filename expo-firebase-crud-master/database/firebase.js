import firebase from 'firebase/app';
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

export {
  db, 
  firebase
}

export default {
  firebase,
  db
};