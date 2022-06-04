import {ENDPOINTS} from '@/api/consts';
import {http} from '@/utils';

export type ThemeRequestBodyType = {
  user_id: number,
}
export type ThemeResponseType = {
    theme_id: number,
    device?: string,
    user_id: number,
    user_theme_id: number,
}

export const getUserTheme = async (params: ThemeRequestBodyType): Promise<ThemeResponseType> => {
  const {user_id} = params;
  const result = await http.get<ThemeRequestBodyType, ThemeResponseType>(
    `/api/v1/theme${user_id}`,
    {
      baseURL: ENDPOINTS.SERVER_HOST,
    }
  );
  return result;
};
