import {TUserResponse} from '@/api/types';
import {
  AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction,
} from '@reduxjs/toolkit';
import {getUser, logout} from '../auth/actions';
import {changeAvatar, changeUser} from './actions';

interface IUserState {
  loading: boolean;
  error: string;
  data: TUserResponse | null;
}

const initialState: IUserState = {
  loading: false,
  error: '',
  data: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addMatcher(isFulfilled(logout), (state) => {
      Object.assign(state, initialState);
    })
    .addMatcher(
      isFulfilled(changeUser, changeAvatar, getUser),
      (state, action: PayloadAction<TUserResponse>) => {
        state.loading = false;
        state.error = '';
        state.data = action.payload;
      },
    )
    .addMatcher(isRejected(changeAvatar, changeUser), (state, action: AnyAction) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addMatcher(isPending(changeAvatar, changeUser), (state) => {
      state.loading = true;
    }),
});

export default authSlice.reducer;