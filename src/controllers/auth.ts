/* eslint-disable no-console */
import {TFormResponse} from '../components/Form/Form';
import authAPI from '../api/auth';

const signIn = async (data: TFormResponse) => {
  try {
    await authAPI.signIn(data);
    const user = await authAPI.getUser();
    console.info(user);
  } catch (error) {
    console.info(error);
  }
};

const signUp = async (data: TFormResponse) => {
  try {
    await authAPI.signUp(data);
    const user = await authAPI.getUser();
    console.info(user);
  } catch (error) {
    console.info(error);
  }
};

export default {
  signUp,
  signIn,
};
