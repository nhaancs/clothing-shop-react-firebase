import * as firebase from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup, User, UserCredential } from "firebase/auth";
import { collection, doc, DocumentData, DocumentReference, Firestore, getDoc, getFirestore, setDoc } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDMBZzi_maTT4_OcaWMp5tiYui8k6e_KHg",
  authDomain: "clothing-shop-db-37554.firebaseapp.com",
  projectId: "clothing-shop-db-37554",
  storageBucket: "clothing-shop-db-37554.appspot.com",
  messagingSenderId: "646151485831",
  appId: "1:646151485831:web:c9f684072f2a18f12f7b22",
};

export const createUserProfileDocument = async (
  userAuth: User|null, 
  additionalData?: any
): Promise<DocumentReference<DocumentData>> => {
  if (!userAuth) {
    return Promise.resolve(null) as any
  }

  const userRef = doc(collection(firestore, 'users'), userAuth.uid)
  const snapShot = await getDoc(userRef)
  if (!snapShot.exists()) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log('error creating user', err.message)
    }
  }

  return userRef
}

export const firebaseApp = firebase.initializeApp(config)

export const auth: Auth = getAuth(firebaseApp)
export const firestore: Firestore = getFirestore(firebaseApp)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = (): Promise<UserCredential> => signInWithPopup(auth, provider)

export default firebase
