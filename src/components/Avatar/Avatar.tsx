import {ENDPOINTS} from '@/api/consts';
import React from 'react';
import s from './avatar.module.scss';

interface IAvatarProps {
  value?: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function Input({value, className, onChange}: IAvatarProps) {
  const readOnly = !onChange;
  return (
    <label className={`${s.avatar} ${readOnly && s.readOnly} ${className}`} htmlFor="avatar">
      <input type="file" className={s.input} onChange={onChange} disabled={readOnly} id="avatar" />
      <div
        className={s.image}
        style={value ? {
          backgroundImage: `url(${ENDPOINTS.FILES_ROOT}${value})`,
        } : {}}
      />
    </label>
  );
}
