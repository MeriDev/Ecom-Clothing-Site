import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
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
const db = getFirestore(app);
// const users = collection(db, 'users');

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

//* Sign in with google
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signUpWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.log(error);
    });
};
