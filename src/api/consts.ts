// eslint-disable-next-line import/prefer-default-export
export const ENDPOINTS = {
  ROOT: 'https://ya-praktikum.tech/api/v2',
  FILES_ROOT: 'https://ya-praktikum.tech',
  SOCKET: 'wss://ya-praktikum.tech/ws',
  AUTH: {
    PATH: '/auth',
    SIGNUP: '/signup',
    SIGNIN: '/signin',
    USER: '/user',
    LOGOUT: '/logout',
    RESOURCES: '/resources',
  },
  USER: {
    PATH: '/user',
    PASSWORD: '/password',
    PROFILE: '/profile',
    AVATAR: '/profile/avatar',
  },
  CHATS: {
    PATH: '/chats',
    ROOT: '/',
    USERS: '/users',
    TOKEN: '/token',
  },
};
