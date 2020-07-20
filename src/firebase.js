// Import the firebase library
import firebase from "firebase";

// Grab and store the config into the "initializeApp" method provided in
// the firebase package. Then store the method in the "firebaseApp" variable
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBrG_-ADOe_4q67KGs572u3ksdHEdBlSF8",
    authDomain: "messenger-clone-2eac8.firebaseapp.com",
    databaseURL: "https://messenger-clone-2eac8.firebaseio.com",
    projectId: "messenger-clone-2eac8",
    storageBucket: "messenger-clone-2eac8.appspot.com",
    messagingSenderId: "74448707293",
    appId: "1:74448707293:web:22f7eb419c914b7163c534",
    measurementId: "G-G1M8F7WPFL"
})

// Push our app aling with its config information into the database
const db = firebaseApp.firestore();

// Export the database
export default db;