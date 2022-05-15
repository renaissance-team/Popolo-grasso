import {combineReducers, configureStore} from '@reduxjs/toolkit';

import leaderboardReducer from '@/pages/Leaderboard/redux/LeaderboardSlice';
import authReducer from './auth/reducer';
import userReducer from './user/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  leaderboard: leaderboardReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GetState = () => RootState;

export default store;
