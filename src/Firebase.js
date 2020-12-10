import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCZfOyLzF8nDHpY5Y7ylM15h5qqIR8nbHI",
  authDomain: "vueapp-5345d.firebaseapp.com",
  databaseURL: "https://vueapp-5345d-default-rtdb.firebaseio.com",
  projectId: "vueapp-5345d",
  storageBucket: "vueapp-5345d.appspot.com",
  messagingSenderId: "879965297620",
  appId: "1:879965297620:web:b40bfd808b5d1ec8bdd441",
  measurementId: "G-G6XGBB85PV"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
