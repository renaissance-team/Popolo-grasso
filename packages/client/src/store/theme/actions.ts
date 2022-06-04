import {createAsyncThunk} from '@reduxjs/toolkit';
import themeAPI from '@/api/theme-api';
import {createErrorString} from '@/utils';
import {RootState} from '..';
import {EThemes} from './reducer';

export const getTheme = createAsyncThunk('theme/getTheme', async (user_id: number, thunkAPI) => {
  try {
    const response = await themeAPI.getUserTheme(user_id);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(createErrorString(error));
  }
});

export const setTheme = createAsyncThunk('theme/setTheme', async (themeId: EThemes, thunkAPI) => {
  try {
    const reduxStore = thunkAPI.getState() as RootState;
    const userId = reduxStore.user.data?.id;

    if (userId) {
    //   await themeAPI.setUserTheme({theme_id: themeId, user_id: userId});
    }
    return themeId;
  } catch (error) {
    return thunkAPI.rejectWithValue(createErrorString(error));
  }
});
