import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';

import authReducer from './auth/reducer';
import authWatcher from './auth/saga';
import todosReducer from './todos';

const rootReducer = combineReducers({
  todos: todosReducer,
  auth: authReducer,
});

function* rootWatcher() {
  yield all([authWatcher()]);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootWatcher);
export default store;
