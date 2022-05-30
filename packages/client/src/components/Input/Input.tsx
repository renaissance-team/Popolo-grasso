import React from 'react';
import cn from 'classnames';
import style from './input.module.scss';

export interface IInputProps extends React.HTMLProps<HTMLInputElement> {
  errorText?: string;
  className?: string;
  error?: boolean;
}

const Input = React.forwardRef(
  ({
    type = 'text', value, label, errorText, className, id, ...props
  }: IInputProps, ref?: React.ForwardedRef<HTMLInputElement>) => (
    <div className={cn(style.wrapper, className)}>
      <input
        ref={ref}
        id={id}
        className={cn(
          style.input,
          {[style.inputIsFilled]: value && value !== ''},
          {[style.inputHasError]: errorText && errorText !== ''}
        )}
        type={type}
        value={value}
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
  )
);

export default Input;
