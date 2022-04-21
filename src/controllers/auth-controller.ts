import {createErrorString} from '@/utils';
import {TFormResponse} from '../components/Form/Form';
import authAPI from '../api/auth-api';

const signIn = async (data: TFormResponse) => {
  try {
    await authAPI.signIn(data);
  } catch (error) {
    throw createErrorString(error);
  }
};

const signUp = async (data: TFormResponse) => {
  try {
    await authAPI.signUp(data);
  } catch (error) {
    throw createErrorString(error);
  }
};

const getUser = async () => {
  try {
    const user = await authAPI.getUser();
    return user;
  } catch (error) {
    throw createErrorString(error);
  }
};

const logout = async () => {
  try {
    await authAPI.logout();
  } catch (error) {
    throw createErrorString(error);
  }
};

export default {
  signUp,
  signIn,
  getUser,
  logout,
};
