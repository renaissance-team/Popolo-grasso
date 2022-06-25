export const ENDPOINTS = {
  APP_URL: 'https://popollo-grasso.herokuapp.com',
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
  OAUTH: {
    YANDEX_API: 'https://oauth.yandex.ru/authorize?response_type=code&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI',
    PATH: '/oauth/yandex',
    SERVICE_ID: '/service-id',
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

export const DEFAULT_SERVER_ERROR = 'Сервер временно не доступен. Приносим извинения за доставленные неудобства.';
