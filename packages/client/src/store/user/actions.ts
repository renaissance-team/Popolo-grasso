import {createAsyncThunk} from '@reduxjs/toolkit';
import userAPI from '@/api/user-api';
import {createErrorString} from '@/utils';
import {TFormResponse} from '@/components/Form/Form';
import themeAPI from '@/api/theme-api';

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

export const getTheme = createAsyncThunk(
  'theme/getTheme',
  async (user_id: number, thunkAPI) => {
    try {
      const response = await themeAPI.getUserTheme(user_id);
      return response === '' ? 0 : +response;
    } catch (error) {
      return thunkAPI.rejectWithValue(createErrorString(error));
    }
  }
);
