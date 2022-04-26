import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuzyjwEtusQ5A-B-opBaWNbXwTS9urlhw",
  authDomain: "blog-app-24f67.firebaseapp.com",
  projectId: "blog-app-24f67",
  databaseURL: "https://blog-app-24f67-default-rtdb.firebaseio.com",
  storageBucket: "blog-app-24f67.appspot.com",
  messagingSenderId: "1020114466641",
  appId: "1:1020114466641:web:f08f48bfd609415236c570"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  console.log("additional data", additionalData);

  // Get a reference to the place in the database where a user profile might be.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the document from that location.
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};

export default firebase;
