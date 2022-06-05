import {ENDPOINTS} from '@/api/consts';
import {http} from '@/utils';

const baseURL = `${ENDPOINTS.SERVER_HOST}/api/v1/theme/`;

export type UserThemeType = {
  user_theme_id: number;
  theme_id: number;
  device?: string;
  user_id: number;
};

export const getThemesList = async (): Promise<string[]> => {
  const result = await http.get<string, string[]>(baseURL);
  return result;
};

export const getUserTheme = async (user_id: number): Promise<UserThemeType> => {
  const result = await http.get<string, UserThemeType>(baseURL + user_id);
  return result;
};

export const setUserTheme = async (params: Omit<UserThemeType, 'user_theme_id'>): Promise<UserThemeType> => {
  const result = await http.post<Omit<UserThemeType, 'user_theme_id'>, UserThemeType>(baseURL, params);
  return result;
};

export default {
  getThemesList,
  getUserTheme,
  setUserTheme
};
