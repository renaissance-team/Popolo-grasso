import React from 'react';
import cn from 'classnames';
import style from './input.module.scss';

export interface IInputProps extends React.HTMLProps<HTMLInputElement> {
  errorText?: string;
  className?: string
}

export default function Input({
  type = 'text', value, label, errorText, className, id, ...props
}: IInputProps) {
  return (
    <div className={cn(style.wrapper, className)}>
      <input
        id={id}
        className={cn(
          style.input,
          {[style.inputIsFilled]: value && value !== ''},
          {[style.inputHasError]: errorText && errorText !== ''},
        )}
        type={type}
        value={value == null ? '' : value}
        {...props}
        placeholder="placeholder"
      />
      {label && (
        <label className={style.label} htmlFor={id}>
          {label}
        </label>
      )}
      {errorText && errorText !== '' && <span className={style.errorText}>{errorText}</span>}
    </div>
  );
}
