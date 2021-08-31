import * as firebase from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDMBZzi_maTT4_OcaWMp5tiYui8k6e_KHg",
  authDomain: "clothing-shop-db-37554.firebaseapp.com",
  projectId: "clothing-shop-db-37554",
  storageBucket: "clothing-shop-db-37554.appspot.com",
  messagingSenderId: "646151485831",
  appId: "1:646151485831:web:c9f684072f2a18f12f7b22",
};

firebase.initializeApp(config)

export const auth = getAuth()
export const firestore = getFirestore()

const provider = new GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = (): Promise<UserCredential> => signInWithPopup(auth, provider)

export default firebase
