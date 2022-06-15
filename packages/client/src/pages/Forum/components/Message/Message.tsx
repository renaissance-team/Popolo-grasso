import React, {ReactElement} from 'react';
import {MessagesResponseType} from '../../api/getMessages';
import style from './message.module.scss';

export default function TopicList({user, text, date}: MessagesResponseType): ReactElement<MessagesResponseType> {
  return (
    <div className={style.massage}>
      <div>{user}</div>
      <div>{text}</div>
      <div>{date.toString().substring(10, 0)}</div>
    </div>
  );
}
