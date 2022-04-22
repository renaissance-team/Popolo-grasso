import {createAsyncThunk} from '@reduxjs/toolkit';
import userAPI from '@/api/user-api';
import {createErrorString} from '@/utils';
import {TFormResponse} from '@/components/Form/Form';

export const changeUser = createAsyncThunk(
  'user/changeUser',
  async (data: TFormResponse, thunkAPI) => {
    try {
      const {oldPassword, newPassword, ...user} = data;
      const [response] = await Promise.all([
        userAPI.changeUser(user),
        oldPassword && newPassword && userAPI.changePassword({oldPassword, newPassword}),
      ]);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(createErrorString(error));
    }
  },
);

export const changeAvatar = createAsyncThunk(
  'user/changeAvatar',
  // eslint-disable-next-line consistent-return
  async (file: File, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await userAPI.changeAvatar(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(createErrorString(error));
    }
  },
);
