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

export default {
  changeUser,
};
