import {createAsyncThunk} from '@reduxjs/toolkit';
import authAPI from '@/api/auth-api';
import {createErrorString} from '@/utils';
import {TFormResponse} from '@/components/Form/Form';
import {TOAuthSignInRequest} from '@/api/types';
import {ENDPOINTS} from '@/api/consts';

type TSignProps = {
  data: TFormResponse;
  redirectFn: () => void;
};

export const init = createAsyncThunk('auth/init', async () => {
  const response = await authAPI.getUser();
  return response.data;
});

export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    const response = await authAPI.getUser();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(createErrorString(error));
  }
});

export const logout = createAsyncThunk('auth/logout', async (redirectFn: () => void, thunkAPI) => {
  try {
    const response = await authAPI.logout();
    redirectFn();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(createErrorString(error));
  }
});

export const signIn = createAsyncThunk('auth/signIn', async ({data, redirectFn}: TSignProps, thunkAPI) => {
  try {
    const response = await authAPI.signIn(data);
    redirectFn();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(createErrorString(error));
  }
});

export const signUp = createAsyncThunk('auth/signUp', async ({data, redirectFn}: TSignProps, thunkAPI) => {
  try {
    const response = await authAPI.signUp(data);
    redirectFn();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(createErrorString(error));
  }
});

export const getOAuthServiceId = createAsyncThunk('auth/getOAuthServiceId', async (redirectUri: string, thunkAPI) => {
  try {
    const response = await authAPI.getOAuthServiceId(redirectUri);
    const {service_id} = response.data;
    if (service_id) {
      window.location.assign(ENDPOINTS.OAUTH.YANDEX_API
        .replace('CLIENT_ID', service_id)
        .replace('REDIRECT_URI', `${window.location.origin}`));
    }
    return service_id;
  } catch (error) {
    return thunkAPI.rejectWithValue(createErrorString(error));
  }
});

export const oAuthSignIn = createAsyncThunk(
  'auth/oAuthSignIn',
  async (data: TOAuthSignInRequest, thunkAPI) => {
    try {
      const response = await authAPI.oAuthSignIn(data);
      window.location.replace(window.location.origin);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(createErrorString(error));
    }
  }
);
