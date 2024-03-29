import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './root-saga';

const sagaMiddleWare = createSagaMiddleware();

const middlewares = [sagaMiddleWare];

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger);
// }

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
