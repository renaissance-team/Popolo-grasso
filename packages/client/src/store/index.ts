import {combineReducers, configureStore} from '@reduxjs/toolkit';
import leaderboardReducer from '@/pages/Leaderboard/redux/LeaderboardSlice';
// import thunkMiddleware from 'redux-thunk';
import topicListReducer from '@/pages/Forum/redux/topicsSlice';
import messagesReducer from '@/pages/Forum/redux/messagesSlice';
import authReducer from './auth/reducer';
import userReducer from './user/reducer';
import themeReducer from './theme/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  leaderboard: leaderboardReducer,
  theme: themeReducer,
  forum: combineReducers({
    topicList: topicListReducer,
    messages: messagesReducer,
  }),
});

// eslint-disable-next-line no-underscore-dangle
const _window = global.window || {};
// eslint-disable-next-line no-underscore-dangle
const state = _window.__INITIAL_STATE__; // Здесь будет объект с данными с сервера
// eslint-disable-next-line no-underscore-dangle
delete _window.__INITIAL_STATE__;

const store = configureStore({
  reducer: rootReducer,
  preloadedState: state,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GetState = () => RootState;

export default store;
