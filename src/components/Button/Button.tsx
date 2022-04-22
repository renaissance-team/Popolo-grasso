import React from 'react';
import cn from 'classnames';
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
  type = 'button', children, className, view = EButtonView.default, ...props
}: IButtonTProps) {
  return (
    <button
      className={cn(s.button, className, {[s.buttonTransparent]: view === EButtonView.transparent})}
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
