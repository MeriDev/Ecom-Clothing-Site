import { takeLatest, all, call, put } from 'redux-saga/effects';

import userActionTypes from './user.types';

import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
  auth,
  googleProvider,
  createUserProfileDoc,
  getCurrentUser,
} from '../../firebase/firebase.utils';

import { getDoc } from 'firebase/firestore';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from '../../Redux/users/user.actions';

export function* getSnapShotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDoc, userAuth, additionalData);

    const userSnapshot = yield getDoc(userRef);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider);
    yield getSnapShotFromUserAuth(user);
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password);
    yield getSnapShotFromUserAuth(user);
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapShotFromUserAuth(userAuth);
  } catch (err) {
    yield put(signInFailure());
  }
}

export function* signingOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    put(signOutFailure(error));
  }
}

// SIGN UP
export function* signingUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    yield console.log(user);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (err) {
    yield put(signUpFailure(err));
  }
}

export function* signInAfterSignOut({ payload: { user, additionalData } }) {
  yield getSnapShotFromUserAuth(user, additionalData);
}

// SAGAS
export function* googleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* emailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* checkUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signingOut);
}

export function* signingUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signingUp);
}

export function* signingUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignOut);
}

// SAGAS
export function* userSagas() {
  yield all([
    call(googleSignInStart),
    call(emailSignInStart),
    call(isUserAuthenticated),
    call(signOutStart),
    call(signingUpStart),
    call(signingUpSuccess),
  ]);
}
