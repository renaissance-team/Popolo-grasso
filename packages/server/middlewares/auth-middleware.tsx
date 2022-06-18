import axios from 'axios';
import {NextFunction, Request, Response} from 'express';

const YANDEX_AUTH_URL = 'https://ya-praktikum.tech/api/v2/auth/user';

const cookieToString = (cookies: Record<string, string>): string => {
  let res = '';

  if (cookies) {
    Object.entries<string>(cookies).forEach(([key, value], ind) => {
      res += `${ind === 0 ? '' : ' '}${key}=${value};`;
    });
  }

  return res;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  enum protectedRoutes {
    '/forum' = 1,
    '/profile' = 1,
    '/leaderboard' = 1,
  }

  const {cookies, url} = req;
  const {locals} = res;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isProtectedRoute = !!protectedRoutes[url];
  if (isProtectedRoute) {
    try {
      const {data: user} = await axios.get(YANDEX_AUTH_URL, {
        headers: {Cookie: cookieToString(cookies)},
      });

      locals.user = user;
    } catch (e) {
      return res.redirect('/auth');
    }
  }

  return next();
};
