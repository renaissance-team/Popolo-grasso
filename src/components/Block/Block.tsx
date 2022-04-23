import React, {ReactElement} from 'react';
import style from './block.module.scss';

interface ILogin {
  title: string;
  children?: ReactElement | ReactElement[];
}

export default function Login({title, children}: ILogin): ReactElement {
  return (
    <div className={style.container}>
      <div className={style.block}>
        <div className={style.header}>
          <h1 className={style.title}>{title}</h1>
        </div>
        <div className={style.inner}>{children}</div>
      </div>
    </div>
  );
}
