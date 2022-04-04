import React, {ReactElement} from 'react';
import {NavLink} from 'react-router-dom';
import popolo from '@/assets/images/motypest1-min.png';
import s from './errorPages.module.scss';

type ErrorPagePropsType = {
  code: number;
  message: string;
  onClick?: (...args: Array<unknown>) => void;
};

function ErrorPage({code, message, onClick = undefined}: ErrorPagePropsType): ReactElement {
  return (
    <div className={s.error}>
      <div className={s.error_container}>
        <div className={s.code}>
          <img src={popolo} alt="error page" className={s.code_image} />
          <div className={s.code_number}>{code}</div>
        </div>
        <div className={s.error_message}>{message}</div>
        <div className={s.error_golink}>
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
    </div>
  );
}

export default ErrorPage;
