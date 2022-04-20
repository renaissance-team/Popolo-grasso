import React from 'react';
import cn from 'classnames';
import s from './input.module.scss';

export interface IInputProps extends React.HTMLProps<HTMLInputElement> {
  errorText?: string;
  className?: string
}

export default function Input({
  type = 'text', value, label, errorText, className, id, ...props
}: IInputProps) {
  return (
    <div className={cn(s.wrapper, className)}>
      <input
        id={id}
        className={cn(
          s.input,
          {[s.inputIsFilled]: value && value !== ''},
          {[s.inputHasError]: errorText && errorText !== ''},
        )}
        type={type}
        value={value == null ? '' : value}
        {...props}
        placeholder="placeholder"
      />
      {label && (
        <label className={s.label} htmlFor={id}>
          {label}
        </label>
      )}
      {errorText && errorText !== '' && <span className={s.errorText}>{errorText}</span>}
    </div>
  );
}
