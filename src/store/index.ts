import {combineReducers, configureStore} from '@reduxjs/toolkit';

import authReducer from './auth/reducer';
import userReducer from './user/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
