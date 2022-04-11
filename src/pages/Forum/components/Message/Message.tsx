import React, {ReactElement} from 'react';
import s from './message.module.scss';
import {MessageType} from '../MessageList/MessageList';

export default function TopicList({user, message, date}: MessageType): ReactElement<MessageType> {
  return (
    <div className={s.massage}>
      <div>{user}</div>
      <div>{message}</div>
      <div>{date}</div>
    </div>
  );
}
