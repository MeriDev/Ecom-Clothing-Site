import { all, call } from 'redux-saga/effects';
import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './users/user.sagas';

function* rootSaga() {
  yield all([call(fetchCollectionsStart), call(userSagas)]);
}

export default rootSaga;
