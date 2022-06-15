import axios from 'axios';

export {default as http} from './AxiosClient';
export * from './hooks';

export const createErrorString = (error: unknown) => {
  let errorMessage = 'Неизвестная ошибка';
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (axios.isAxiosError(error)) {
    errorMessage = error.response?.data.reason || error.message;
  } else if (error instanceof Error) {
    errorMessage = error.toString();
  }
  return errorMessage;
};
