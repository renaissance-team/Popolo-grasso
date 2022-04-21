import {TUserResponse} from '@/api/types';
import {isLoadingAction, isRejectedAction} from '@/utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getUser} from './actions';

interface IUserState {
  loading: boolean;
  error: string;
  isAuth: boolean;
  userData: TUserResponse | null;
}

const initialState: IUserState = {
  loading: false,
  error: '',
  isAuth: false,
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUser(state, action: PayloadAction<TUserResponse>) {
      state.userData = action.payload;
    },
    clearUser(state) {
      state.userData = null;
    },
  },
  extraReducers: (builder) => builder
    .addCase(getUser.fulfilled.type, (state, action: PayloadAction<TUserResponse>) => {
      state.loading = false;
      state.error = '';
      state.isAuth = true;
      state.userData = action.payload;
    })
    .addMatcher(
      isRejectedAction,
      (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
    )
    .addMatcher(
      isLoadingAction,
      (state) => { state.loading = true; },
    )
  ,
});

export const {setUser, setLoading, clearUser} = authSlice.actions;

export default authSlice.reducer;
