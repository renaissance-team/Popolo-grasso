import axios from 'axios';
import {TFormResponse} from '@/components/Form/Form';
import {ENDPOINTS} from './consts';
import {
  TUserResponse, TOAuthServiceIdResponse, TOAuthSignInRequest
} from './types';

const baseURL = ENDPOINTS.AUTH.PATH;

const signUp = (data: TFormResponse) => axios.post<{id: number}>(baseURL + ENDPOINTS.AUTH.SIGNUP, data);

const signIn = (data: TFormResponse) => axios.post<string>(baseURL + ENDPOINTS.AUTH.SIGNIN, data);

const getUser = () => axios.get<TUserResponse>(baseURL + ENDPOINTS.AUTH.USER);

const logout = () => axios.post<string>(baseURL + ENDPOINTS.AUTH.LOGOUT);

const getOAuthServiceId = (redirectUri: string) => axios
  .get<TOAuthServiceIdResponse>(`${ENDPOINTS.OAUTH.PATH + ENDPOINTS.OAUTH.SERVICE_ID}?redirect_uri=${redirectUri}`);

const oAuthSignIn = (data: TOAuthSignInRequest) => axios.post<string>(ENDPOINTS.OAUTH.PATH, data);

export default {
  signUp,
  signIn,
  getUser,
  logout,
  getOAuthServiceId,
  oAuthSignIn,
};
