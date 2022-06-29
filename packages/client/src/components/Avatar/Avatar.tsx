import {ENDPOINTS} from '@/api/consts';
import React from 'react';
import cn from 'classnames';
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {changeAvatar} from '@/store/user/actions';
import style from './avatar.module.scss';

interface IAvatarProps {
  value?: string;
  className?: string;
}

export default function Input({value, className}: IAvatarProps) {
  const readOnly = false;
  const dispatch = useDispatch();

  const changeAvatarHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files?.length) {
      const file = target.files[0];
      dispatch(changeAvatar(file) as unknown as AnyAction);
    }
  };
  return (
    <label className={cn({[style.readOnly]: readOnly}, className)} htmlFor="avatar">
      <input
        type="file"
        className={style.input}
        onChange={(event) => {
          changeAvatarHandler(event);
        }}
        accept="image/*"
        id="avatar"
      />
      <div
        className={style.image}
        style={
          value
            ? {
              backgroundImage: `url(${ENDPOINTS.ROOT + ENDPOINTS.AUTH.RESOURCES}${value})`,
            }
            : {}
        }
      />
    </label>
  );
}
