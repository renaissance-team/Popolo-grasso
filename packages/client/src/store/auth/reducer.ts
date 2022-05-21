import {
  AnyAction, createSlice, isFulfilled, isPending, isRejected, isRejectedWithValue,
} from '@reduxjs/toolkit';
import {
  init, getUser, logout, signIn, signUp,
} from './actions';

interface IAuthState {
  loading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: IAuthState = {
  loading: false,
  error: '',
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addMatcher(isFulfilled(init, signUp, signIn, getUser), (state) => {
      state.error = '';
      state.isAuth = true;
      state.loading = false;
    })
    .addMatcher(isFulfilled(logout), (state) => {
      Object.assign(state, {...initialState, loading: false});
    })
    .addMatcher(isRejectedWithValue(getUser, logout, signIn, signUp), (state, action: AnyAction) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addMatcher(isRejected(init), (state) => {
      state.loading = false;
    })
    .addMatcher(isPending(init, getUser, logout, signIn, signUp), (state) => {
      state.loading = true;
    }),
});

export default authSlice.reducer;
