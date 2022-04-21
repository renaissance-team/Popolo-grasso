import {
  AnyAction, createSlice, isFulfilled, isPending, isRejected,
} from '@reduxjs/toolkit';
import {
  getUser, logout, signIn, signUp,
} from './actions';

interface IAuthState {
  loading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: IAuthState = {
  loading: true,
  error: '',
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addMatcher(isFulfilled(getUser), (state) => {
      state.error = '';
      state.isAuth = true;
      state.loading = false;
    })
    .addMatcher(isFulfilled(logout), (state) => {
      Object.assign(state, {...initialState, loading: false});
    })
    .addMatcher(isFulfilled(signUp, signIn), (state) => {
      state.error = '';
      state.isAuth = true;
      state.loading = false;
    })
    .addMatcher(isRejected(getUser, logout, signIn, signUp), (state, action: AnyAction) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addMatcher(isPending(getUser, logout, signIn, signUp), (state) => {
      state.loading = true;
    }),
});

export default authSlice.reducer;