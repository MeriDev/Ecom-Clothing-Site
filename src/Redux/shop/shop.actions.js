import shopActionTypes from './shop.types';

export const fetchCollectionsStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = errMessage => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errMessage,
});
