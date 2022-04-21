import React, {ReactElement} from 'react';
import cn from 'classnames';
import {ROUTES} from '@/pages/consts';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {useAppSelector} from '@/utils';
import {logout} from '@/store/auth/actions';
import Button from '../Button/Button';
import s from './MainContainer.module.scss';

interface IMainContainer {
  children: ReactElement;
}
type TNavItem = {label: string, link: string, private?: boolean}

const navItems:Record<string, TNavItem> = {
  home: {label: 'Главная', link: ROUTES.HOME},
  game: {label: 'Игра', link: ROUTES.GAME, private: true},
  forum: {label: 'Форум', link: ROUTES.FORUM, private: true},
  leaderboard: {label: 'Лидерборд', link: ROUTES.LEADERBOARD, private: true},
  profile: {label: 'Профиль', link: ROUTES.PROFILE, private: true},
};

export default function MainContainer({children}: IMainContainer) {
  const {isAuth} = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className={s.header}>
        <nav className={s.nav}>
          <ul className={s.list}>
            {Object.values(navItems)
              .filter((item) => (isAuth ? item : !item.private))
              .map(({label, link}) => (
                <li key={label} className={s.list_item}>
                  <Link to={link} className={s.link}>
                    {label}
                  </Link>
                </li>
              ))}
            {isAuth && (
            <li className={cn(s.list_item, s.list_item_last)}>
              <Button onClick={handleLogout} className={s.button_logout}>
                Выход
              </Button>
            </li>
            )}
          </ul>
        </nav>
      </header>
      {children}
    </>
  );
}
