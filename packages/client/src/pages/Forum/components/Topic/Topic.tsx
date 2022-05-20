import React, {ReactElement} from 'react';
import cn from 'classnames';
import {TopicType} from '../TopicList/TopicList';
import style from './topic.module.scss';

export default function Topic({
  topic_name,
  user,
  last_message,
  response_count,
  last_date,
}: TopicType): ReactElement<TopicType> {
  return (
    <div className={style.topic}>
      <div className={cn(style.topic_name, style.pb_5)}>{topic_name}</div>
      {response_count > 0 && (
        <>
          <div className={style.pb_5}>
            <b>{`${user}: `}</b>
            <span className={style.sub}>{last_message}</span>
          </div>
          <div className={style.pb_5}>
            <span>Ответов: </span>
            <span className={style.topic_count}>{response_count}</span>
          </div>
          <div>
            <span>Последний: </span>
            <span className={style.sub}>{last_date}</span>
          </div>
        </>
      )}
    </div>
  );
}
