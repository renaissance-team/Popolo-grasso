import React, {ReactElement} from 'react';
import {NavLink} from 'react-router-dom';
import popolo from '@/assets/images/motypest1-min.png';
import style from './errorPages.module.scss';

type ErrorPagePropsType = {
  code: number;
  message: string;
  onClick?: (...args: Array<unknown>) => void;
};

function ErrorPage({code, message, onClick = undefined}: ErrorPagePropsType): ReactElement {
  return (
    <div className={style.error}>
      <div className={style.error_container}>
        <div className={style.code}>
          <img src={popolo} alt="error page" className={style.code_image} />
          <div className={style.code_number}>{code}</div>
        </div>
        <div className={style.error_message}>{message}</div>
        <NavLink
          to="/"
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
        >
          На главную
        </NavLink>
      </div>
    </div>
  );
}

export default ErrorPage;
