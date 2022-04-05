import React from 'react';
import s from './input.module.scss';

interface IInputProps extends React.HTMLProps<HTMLInputElement> {
  errorText?: string;
}

export default function Input({
  type = 'text', value, label, errorText, ...props
}: IInputProps) {
  return (
    <div className={s.wrapper}>
      {label && <span className={s.label}>{label}</span>}
      <input
        className={`
          ${s.input}
          ${value && value !== '' && s.inputIsFilled}
          ${errorText && errorText !== '' && s.inputHasError}
         `}
        type={type}
        value={value == null ? '' : value}
        {...props}
      />
      {errorText && errorText !== '' && <span className={s.errorText} />}
    </div>
  );
}
