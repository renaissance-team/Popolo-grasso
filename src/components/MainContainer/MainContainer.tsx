import React, {ReactElement} from 'react';
import {AnyAction} from 'redux';
import cn from 'classnames';
import {ROUTES} from '@/pages/consts';
import {useDispatch} from 'react-redux';
import {NavLink, useNavigate} from 'react-router-dom';
import {useAppSelector} from '@/utils';
import {logout} from '@/store/auth/actions';
import Button from '../Button/Button';
import style from './MainContainer.module.scss';

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
  const navigate = useNavigate();
  const {isAuth} = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(() => navigate(ROUTES.AUTH)) as unknown as AnyAction);
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
                  <NavLink to={link} className={({isActive}) => cn({[style.active]: isActive}, style.link)}>
                    {label}
                  </NavLink>
                </li>
              ))}
            {isAuth && (
            <li className={cn(style.list_item, style.list_item_last)}>
              <Button onClick={handleLogout} className={style.button_logout}>
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
