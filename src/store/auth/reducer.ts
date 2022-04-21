import {isLoadingAction, isRejectedAction} from '@/utils';
import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {
  getUser, logout, signIn, signUp,
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
    .addCase(getUser.fulfilled.type, (state) => {
      state.loading = false;
      state.error = '';
      state.isAuth = true;
    })
    .addCase(logout.fulfilled.type, (state) => {
      Object.assign(state, initialState);
    })
    .addMatcher(isAnyOf(signUp.fulfilled, signIn.fulfilled), (state) => {
      state.isAuth = true;
    })
    .addMatcher(isRejectedAction, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addMatcher(isLoadingAction, (state) => {
      state.loading = true;
    }),
});

export default authSlice.reducer;
