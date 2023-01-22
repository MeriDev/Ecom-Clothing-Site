import { takeLatest, put, call, all } from 'redux-saga/effects';
import shopActionTypes from './shop.types';
import {
  db,
  convertCollectcionsSnapshotToObjects,
} from '../../firebase/firebase.utils';
import { collection, getDocs } from 'firebase/firestore';
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from './shop.actions';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = collection(db, 'collections');
    const snapshot = yield getDocs(collectionRef);

    const collectionsMap = yield call(
      convertCollectcionsSnapshotToObjects,
      snapshot
    ); //in case it takes longer
    yield put(fetchCollectionsSuccess(collectionsMap)); //to dispatch
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    shopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
