import { initializeApp } from 'firebase/app';
import {
  collection,
  getFirestore,
  doc,
  getDoc,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAt6B-P3ZImqoXBKk9cLL0wT7iYhoJGowI',
  authDomain: 'crwn-f6bf3.firebaseapp.com',
  projectId: 'crwn-f6bf3',
  storageBucket: 'crwn-f6bf3.appspot.com',
  messagingSenderId: '182015742544',
  appId: '1:182015742544:web:be1933ae03a5276da4b755',
};

const app = initializeApp(firebaseConfig);

//* Add users to DB
// FIRESTORE
export const db = getFirestore(app);

export const createUserProfileDoc = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, 'users', userAuth.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.error('Error adding document: ', err.mesage);
    }
  }
  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsunscribe = auth.onAuthStateChanged(userAuth => {
      unsunscribe();
      resolve(userAuth);
    }, reject);
  });
};

//* Sign in with google
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const signUpWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
};

// Add Datat to firstore
export const addCollectionsAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);

  const collectionRef = collection(db, collectionKey);
  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef);
    batch.set(newDocRef, obj);
    console.log(newDocRef);
  });

  return await batch.commit();
};

// Fetch data from firestore and add routename proprety
export const convertCollectcionsSnapshotToObjects = collections => {
  const transformedCollections = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};
