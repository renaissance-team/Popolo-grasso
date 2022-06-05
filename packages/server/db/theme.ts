import {connect} from './connecton';
import {
  ThemeResponseType, UserThemeType, UserThemeResponseType, SelectedUserThemeType
} from './types';

// eslint-disable-next-line max-len
export const getUserTheme = (host: string, port: number, user_id: number) => new Promise<SelectedUserThemeType[]>((resolve, reject) => {
  connect(host, port).query(
    `SELECT ut.*, t.name 
    FROM popolo.user_theme as ut
    JOIN popolo.theme as t on t.theme_id = ut.theme_id
    WHERE user_id = $1`,
    [user_id],
    (error: any, results: {rows: SelectedUserThemeType[]}) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    }
  );
});

// eslint-disable-next-line max-len
export const createUserTheme = (host: string, port: number, user_id: number) => new Promise<SelectedUserThemeType[]>((resolve, reject) => {
  connect(host, port).query(
    `INSERT INTO popolo.user_theme (theme_id, user_id)
    VALUES ((SELECT MIN(theme_id) FROM popolo.theme), $1)
    RETURNING *`,
    [user_id],
    (error: any, results: {rows: SelectedUserThemeType[]}) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    }
  );
});

// eslint-disable-next-line max-len
export const setTheme = (host: string, port: number, theme: UserThemeType) => new Promise<UserThemeResponseType[]>((resolve, reject) => {
  const {theme_id, device, user_id} = theme;
  connect(host, port).query(
    `UPDATE popolo.user_theme
    SET theme_id=$1,
        device=$2
    WHERE user_id=$3
    RETURNING *`,
    [theme_id, device, user_id],
    (error: any, results: {rows: UserThemeResponseType[]}) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    }
  );
});

export const getTheme = (host: string, port: number) => new Promise<ThemeResponseType[]>((resolve, reject) => {
  connect(host, port).query(
    'SELECT * FROM popolo.theme',
    (error: any, results: {rows: ThemeResponseType[]}) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    }
  );
});
