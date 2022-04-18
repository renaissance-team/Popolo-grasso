import {TUserResponse} from '@/api/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IUserState {
  loading: boolean;
  userData: TUserResponse | null;
}

const initialState: IUserState = {
  loading: true,
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
});

export const {setUser, setLoading, clearUser} = authSlice.actions;

export default authSlice.reducer;
