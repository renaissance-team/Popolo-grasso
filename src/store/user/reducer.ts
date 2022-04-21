import {TUserResponse} from '@/api/types';
import {isLoadingAction, isRejectedAction} from '@/utils';
import {createSlice, isAnyOf, PayloadAction} from '@reduxjs/toolkit';
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
    .addCase(logout.fulfilled.type, (state) => {
      Object.assign(state, initialState);
    })
    .addMatcher(
      isAnyOf(changeUser.fulfilled, changeAvatar.fulfilled, getUser.fulfilled),
      (state, action: PayloadAction<TUserResponse>) => {
        state.loading = false;
        state.error = '';
        state.data = action.payload;
      },
    )
    .addMatcher(isRejectedAction, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })
    .addMatcher(isLoadingAction, (state) => {
      state.loading = true;
    }),
});

export default authSlice.reducer;
