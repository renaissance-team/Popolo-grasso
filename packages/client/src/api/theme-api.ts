import {ENDPOINTS} from '@/api/consts';
import {http} from '@/utils';

const baseURL = `${ENDPOINTS.SERVER_HOST}/api/v1/theme/`;

export type UserThemeType = {
  theme_id: number;
  device?: string;
  user_id: number;
};

export const getThemesList = async (): Promise<string> => {
  const result = await http.get<string, string>(baseURL);
  console.info(result);
  return result;
};

export const getUserTheme = async (user_id: number): Promise<string> => {
  const result = await http.get<string, string>(baseURL + user_id);
  console.info(result);
  return result;
};

export const setUserTheme = async (params: UserThemeType): Promise<string> => {
  const result = await http.post<UserThemeType, string>(baseURL, params);
  return result;
};

export default {
  getThemesList,
  getUserTheme,
  setUserTheme
};
