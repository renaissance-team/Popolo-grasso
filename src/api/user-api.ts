import {TFormResponse} from '@/components/Form/Form';
import axios from 'axios';
import {ENDPOINTS} from './consts';
import {TUserResponse} from './types';

const baseURL = ENDPOINTS.ROOT + ENDPOINTS.USER.PATH;

const changeUser = (data: TFormResponse) => axios.put(baseURL + ENDPOINTS.USER.PROFILE, data);

const changePassword = (data: TFormResponse) => axios.put(baseURL + ENDPOINTS.USER.PASSWORD, data);

const changeAvatar = (data: FormData) => axios.put<TUserResponse>(baseURL + ENDPOINTS.USER.AVATAR, data, {
  headers: {'Content-Type': 'text/plain'},
});

export default {
  changeUser,
  changePassword,
  changeAvatar,
};
