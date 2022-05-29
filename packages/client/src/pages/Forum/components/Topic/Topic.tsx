import React, {ReactElement} from 'react';
import cn from 'classnames';
import style from './topic.module.scss';
import {ForumTopicResponseType} from '../api/getTopicList';

export default function Topic({
  name,
  user,
  text,
  date,
  created_date,
}: ForumTopicResponseType): ReactElement<ForumTopicResponseType> {
  return (
    <div className={style.topic}>
      <div className={cn(style.topic_name, style.pb_5)}>{name}</div>
      {text && (
        <>
          <div className={style.pb_5}>
            <span>Создана: </span>
            <span className={style.topic_count}>{created_date.toString().substring(10, 0)}</span>
          </div>
          <div className={style.pb_5}>
            <span>Последний: </span>
            <span className={style.sub}>{date.toString().substring(10, 0)}</span>
          </div>
          <div>
            <b>{`${user}: `}</b>
            <span className={style.sub}>{text}</span>
          </div>
        </>
      )}
    </div>
  );
}
