import {
  AnyAction, createSlice, isFulfilled, isPending, isRejected, isRejectedWithValue
} from '@reduxjs/toolkit';
import {
  init, getUser, logout, signIn, signUp, getOAuthServiceId, oAuthSignIn
} from './actions';

interface IAuthState {
  loading: boolean;
  error: string;
  isAuth: boolean;
  serviceId: string | undefined;
}

const initialState: IAuthState = {
  loading: false,
  error: '',
  isAuth: false,
  serviceId: undefined,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addMatcher(isFulfilled(init, signUp, oAuthSignIn, signIn, getUser), (state) => {
      state.error = '';
      state.isAuth = true;
      state.loading = false;
    })
    .addMatcher(isFulfilled(logout), (state) => {
      Object.assign(state, {...initialState, loading: false});
    })
    .addMatcher(
      isRejectedWithValue(getUser, logout, signIn, signUp, getOAuthServiceId, oAuthSignIn),
      (state, action: AnyAction) => {
        state.error = action.payload;
        state.loading = false;
      }
    )
    .addMatcher(isRejected(init), (state) => {
      state.loading = false;
    })
    .addMatcher(isPending(init, getUser, logout, signIn, signUp, getOAuthServiceId, oAuthSignIn), (state) => {
      state.loading = true;
    }),
});

export default authSlice.reducer;
