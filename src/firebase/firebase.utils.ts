import * as firebase from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { collection, CollectionReference, doc, DocumentReference, Firestore, getDoc, getFirestore, QuerySnapshot, setDoc, writeBatch } from "firebase/firestore";
import { Collection } from "../models/collection.model";
import { User } from "../models/user.model";

const config = {
  apiKey: "AIzaSyDMBZzi_maTT4_OcaWMp5tiYui8k6e_KHg",
  authDomain: "clothing-shop-db-37554.firebaseapp.com",
  projectId: "clothing-shop-db-37554",
  storageBucket: "clothing-shop-db-37554.appspot.com",
  messagingSenderId: "646151485831",
  appId: "1:646151485831:web:c9f684072f2a18f12f7b22",
};

export const createUserProfileDocument = async (
  firebaseUser: FirebaseUser|null, 
  additionalData?: any
): Promise<DocumentReference<User>> => {
  if (!firebaseUser) {
    return Promise.resolve(null) as any
  }

  const userRef = doc(collection(firestore, 'users') as CollectionReference<User>, firebaseUser.uid)
  const snapShot = await getDoc(userRef)
  if (!snapShot.exists()) {
    const {displayName, email} = firebaseUser
    const createdAt = new Date()

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log('error creating user', err)
    }
  }

  return userRef
}

export const addCollectionAndDocuments = async <T>(collectionKey: string, documents: T[]): Promise<void> => {
  const collectionRef = collection(firestore, collectionKey)
  const batch = writeBatch(firestore)
  documents.forEach(document => {
    const newDocRef = doc(collectionRef)
    batch.set(newDocRef, document)
  });
  return await batch.commit()
}


export const convertCollectionsSnapshotToMap = (collectionsSnapshot: QuerySnapshot<Collection>): Map<string, Collection> => {
  const transformedCollections: Collection[] = collectionsSnapshot.docs.map(doc => {
    const {title, items} = doc.data()

    return {
      title: title,
      items: items,
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id
    }
  })

  return transformedCollections.reduce<Map<string, Collection>>((accumulator, collection, _, __) => {
    accumulator.set(collection.routeName, collection)
    return accumulator
  }, new Map<string, Collection>())
}

export const firebaseApp = firebase.initializeApp(config)

export const getCurrentUser = () => {
  return new Promise<FirebaseUser>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user as FirebaseUser)
    }, reject)
  })
}

export const auth: Auth = getAuth(firebaseApp)
export const firestore: Firestore = getFirestore(firebaseApp)

export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({prompt: 'select_account'})

export default firebase
