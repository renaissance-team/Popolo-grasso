import React, {ReactElement} from 'react';
import s from './block.module.scss';

interface ILogin {
  title: string;
  children?: ReactElement | ReactElement[];
}

export default function Login({
  title, children,
}: ILogin): ReactElement {
  return (
    <div className={s.block}>
      <h1 className={s.title}>{title}</h1>
      {children}
    </div>
  );
}
