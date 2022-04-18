import userApi from '@/api/user-api';
import {createError} from '@/utils';
import {TFormResponse} from '../components/Form/Form';

const changeUser = async (data: TFormResponse) => {
  try {
    const {oldPassword, newPassword, ...user} = data;
    const [res] = await Promise.all([
      userApi.changeUser(user),
      oldPassword && newPassword && userApi.changePassword({oldPassword, newPassword}),
    ]);
    return res;
  } catch (error) {
    throw createError(error);
  }
};

const changeAvatar = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await userApi.changeAvatar(formData);
    console.info(res);
  } catch (error) {
    throw createError(error);
  }
};

export default {
  changeUser,
  changeAvatar,
};
