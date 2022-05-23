import React, {ReactElement, useEffect, useState} from 'react';
import classNames from 'classnames';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {
  NavLink, useLocation, useNavigate
} from 'react-router-dom';
import {ROUTES} from '@/pages/consts';
import {useAppSelector, useDidUpdateEffect} from '@/utils';
import {logout} from '@/store/auth/actions';
import Button from '../Button/Button';
import style from './MainContainer.module.scss';

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
  const navigate = useNavigate();
  const location = useLocation();
  const {isAuth, error: authError} = useAppSelector((state) => state.auth);
  const {error: userError} = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  const errorsStore = {authError, userError};

  const [errorsLocal, setErrorsLocal] = useState<Record<string, string>>({...errorsStore});

  useEffect(() => {
    setErrorsLocal(errorsStore);
  }, [authError, userError]);

  useDidUpdateEffect(() => {
    setErrorsLocal({});
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

  return (
    <>
      <header className={style.header}>
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
      </header>
      {children}
    </>
  );
}
