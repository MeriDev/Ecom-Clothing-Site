import { takeLatest, put, call, all } from 'redux-saga/effects';

import { clearCart } from './cart-actions';
import userActionTypes from '../users/user.types';

export function* clearingCartOnSignout() {
  yield put(clearCart());
}

export function* onSignoutOutSuccess() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearingCartOnSignout);
}

export function* cartSagas() {
  yield all([call(onSignoutOutSuccess)]);
}
