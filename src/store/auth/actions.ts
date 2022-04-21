import {createAsyncThunk} from '@reduxjs/toolkit';
import authApi from '@/api/auth-api';
import {createErrorString} from '@/utils';

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, thunkAPI) => {
    try {
      const response = await authApi.getUser();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(createErrorString(error));
    }
  },
);
