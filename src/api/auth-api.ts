import {TFormResponse} from '@/components/Form/Form';
import axios from 'axios';
import {ENDPOINTS} from './consts';
import {TUserResponse} from './types';

const baseURL = ENDPOINTS.AUTH.PATH;

const signUp = (data: TFormResponse) => axios.post(baseURL + ENDPOINTS.AUTH.SIGNUP, data);

const signIn = (data: TFormResponse) => axios.post(baseURL + ENDPOINTS.AUTH.SIGNIN, data);

const getUser = () => axios.get<TUserResponse>(baseURL + ENDPOINTS.AUTH.USER);

const logout = () => axios.post(baseURL + ENDPOINTS.AUTH.LOGOUT);

export default {
  signUp,
  signIn,
  getUser,
  logout,
};
