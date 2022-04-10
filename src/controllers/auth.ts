import {TFormResponse} from '../components/Form/Form';

const signIn = async (data: TFormResponse) => {
  console.info(data);
};

const signUp = async (data: TFormResponse) => {
  console.info(data);
};

export default {
  signUp,
  signIn,
};
