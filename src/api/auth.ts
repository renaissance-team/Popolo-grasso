import {TFormResponse} from '@/components/Form/Form';
import axios from 'axios';
import {ENDPOINTS} from './consts';

axios.defaults.baseURL = ENDPOINTS.ROOT + ENDPOINTS.AUTH.PATH;
axios.defaults.withCredentials = true;

const signUp = (data: TFormResponse) => axios.post(ENDPOINTS.AUTH.SIGNUP, data);

const signIn = (data: TFormResponse) => axios.post(ENDPOINTS.AUTH.SIGNIN, data);

const getUser = () => axios.get(ENDPOINTS.AUTH.USER);

const logout = () => axios.post(ENDPOINTS.AUTH.LOGOUT);

export default {
  signUp,
  signIn,
  getUser,
  logout,
};
