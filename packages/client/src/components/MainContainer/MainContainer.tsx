import React, {
  ReactElement, useEffect, useState, useRef
} from 'react';
import classNames from 'classnames';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {ROUTES} from '@/pages/consts';
import {
  useAppSelector, useDidUpdateEffect, useOnClickOutside, useTheme
} from '@/utils';
import {logout} from '@/store/auth/actions';
import {setTheme, getTheme} from '@/store/theme/actions';
import {EThemes} from '@/store/theme/reducer';
import moonIcon from '@/assets/images/moon.svg';
import sunIcon from '@/assets/images/sun.svg';
import Button from '../Button/Button';
import style from './MainContainer.module.scss';
import Avatar from '../Avatar/Avatar';

interface IMainContainer {
  children: ReactElement;
}
type TNavItem = {label: string; link: string; private?: boolean};

const navItems: Record<string, TNavItem> = {
  home: {label: 'Главная', link: ROUTES.HOME},
  game: {label: 'Игра', link: ROUTES.GAME, private: true},
  forum: {label: 'Форум', link: ROUTES.FORUM, private: true},
  leaderboard: {label: 'Лидерборд', link: ROUTES.LEADERBOARD, private: true},
  profile: {label: 'Профиль', link: ROUTES.PROFILE, private: true},
};

export default function MainContainer({children}: IMainContainer) {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {isAuth, error: authError} = useAppSelector((state) => state.auth);
  const {error: userError, data: userData} = useAppSelector((state) => state.user);
  const {error: themeError, theme} = useAppSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const errorsStore = {authError, userError, themeError};
  const [errorsLocal, setErrorsLocal] = useState<Record<string, string>>({...errorsStore});

  const isLightTheme = EThemes.light === theme;

  useEffect(() => {
    setErrorsLocal(errorsStore);
  }, [authError, userError]);

  useDidUpdateEffect(() => {
    setErrorsLocal({});
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout(() => navigate(ROUTES.AUTH)) as unknown as AnyAction);
  };

  const hideError = (key: string) => {
    setErrorsLocal({
      ...errorsLocal,
      [key]: '',
    });
  };

  const handleChangeTheme = () => dispatch(
    setTheme(theme !== EThemes.light ? EThemes.light : EThemes.dark) as unknown as AnyAction
  );

  useOnClickOutside(sidebarRef, (event) => {
    if (!sidebarRef.current?.contains(event.target as Node)) {
      setSidebarOpen(false);
    }
  });

  useEffect(() => {
    if (isAuth && userData) {
      dispatch(getTheme(userData.id) as unknown as AnyAction);
    }
  }, [isAuth]);

  return (
    <div className={useTheme(style, 'container')}>
      <div className={classNames([style.sidebar, sidebarOpen && style.active])} ref={sidebarRef}>
        <button
          type="button"
          className={style.triggerSidebar}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={`${!sidebarOpen ? 'Открыть' : 'Закрыть'} меню`}
        />
        {userData && (
          <div className={style.profile}>
            <Avatar value={userData.avatar} />
            <h4>{`привет,${userData.display_name || userData.login}!`}</h4>
          </div>
        )}
        <nav className={style.nav}>
          <ul className={style.list}>
            {Object.values(navItems)
              .filter((item) => (isAuth ? item : !item.private))
              .map(({label, link}) => (
                <li key={label} className={style.list_item}>
                  <NavLink to={link} className={({isActive}) => classNames({[style.active]: isActive}, style.link)}>
                    {label}
                  </NavLink>
                </li>
              ))}
            {isAuth && (
              <li className={classNames(style.list_item, style.list_item_last)}>
                <Button onClick={handleLogout} className={style.button_logout}>
                  Выход
                </Button>
              </li>
            )}
          </ul>
        </nav>
        <div className={style.footer}>
          <button type="button" className={style.trigerTheme} onClick={handleChangeTheme} aria-label="Изменить тему">
            {isLightTheme ? <img src={moonIcon} alt="moon" /> : <img src={sunIcon} alt="sun" />}
          </button>
        </div>
      </div>
      {children}
      {Object.entries(errorsLocal)
        .filter(([, error]) => error !== '')
        .map(([key, error]) => (
          <div
            className={style.error}
            role="button"
            key={key}
            onClick={() => hideError(key)}
            tabIndex={0}
            aria-hidden="true"
          >
            {error}
          </div>
        ))}
    </div>
  );
}
