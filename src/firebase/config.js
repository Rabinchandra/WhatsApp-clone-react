import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBhj-PFRquvPnKy_hDh_iYnyvoKnJ8tE4o",
  authDomain: "whats-app-clone-react-9398b.firebaseapp.com",
  databaseURL: "https://whats-app-clone-react-9398b.firebaseio.com",
  projectId: "whats-app-clone-react-9398b",
  storageBucket: "whats-app-clone-react-9398b.appspot.com",
  messagingSenderId: "656540838432",
  appId: "1:656540838432:web:0f0591dd4d90721df8aa45",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { provider, db, firebase, timestamp };
