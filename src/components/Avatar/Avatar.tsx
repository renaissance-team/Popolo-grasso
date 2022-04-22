import {ENDPOINTS} from '@/api/consts';
import React from 'react';
import cn from 'classnames';
import s from './avatar.module.scss';

interface IAvatarProps {
  value?: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input({value, className, onChange}: IAvatarProps) {
  const readOnly = !onChange;
  return (
    <label className={cn(s.avatar, {[s.readOnly]: readOnly}, className)} htmlFor="avatar">
      <input type="file" className={s.input} onChange={onChange} disabled={readOnly} id="avatar" />
      <div
        className={s.image}
        style={value ? {
          backgroundImage: `url(${ENDPOINTS.ROOT + ENDPOINTS.AUTH.RESOURCES}${value})`,
        } : {}}
      />
    </label>
  );
}
