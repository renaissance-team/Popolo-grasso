import {createAsyncThunk} from '@reduxjs/toolkit';
import authAPI from '@/api/auth-api';
import {createErrorString} from '@/utils';
import {TFormResponse} from '@/components/Form/Form';

type TSignProps = {
  data: TFormResponse;
  redirectFn: () => void;
};

export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    const response = await authAPI.getUser();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(createErrorString(error));
  }
});

export const logout = createAsyncThunk(
  'auth/logout',
  // eslint-disable-next-line consistent-return
  async (redirectFn: () => void, thunkAPI) => {
    try {
      await authAPI.logout();
      redirectFn();
    } catch (error) {
      return thunkAPI.rejectWithValue(createErrorString(error));
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  // eslint-disable-next-line consistent-return
  async ({data, redirectFn}: TSignProps, thunkAPI) => {
    try {
      await authAPI.signIn(data);
      redirectFn();
    } catch (error) {
      return thunkAPI.rejectWithValue(createErrorString(error));
    }
  },
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  // eslint-disable-next-line consistent-return
  async ({data, redirectFn}: TSignProps, thunkAPI) => {
    try {
      await authAPI.signUp(data);
      redirectFn();
    } catch (error) {
      return thunkAPI.rejectWithValue(createErrorString(error));
    }
  },
);
