import React from 'react';
import s from './Button.module.scss';

export enum EButtonView {
  default,
  transparent,
}

interface IButtonTProps extends React.HTMLProps<HTMLButtonElement> {
  view?: EButtonView;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  type = 'button', children, view, ...props
}: IButtonTProps) {
  return (
    <button
      className={`${s.button} ${view === EButtonView.transparent && s.buttonTransparent}`}
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
