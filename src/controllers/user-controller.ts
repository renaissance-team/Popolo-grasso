/* eslint-disable no-console */
import userApi from '@/api/user-api';
import {TFormResponse} from '../components/Form/Form';

const changeUser = async (data: TFormResponse) => {
  try {
    await userApi.changeUser(data);
  } catch (error) {
    console.info(error);
  }
};

const changeAvatar = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await userApi.changeAvatar(formData);
    console.info(res);
  } catch (error) {
    console.info(error);
  }
};

export default {
  changeUser,
  changeAvatar,
};
