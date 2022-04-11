import React, {ReactElement} from 'react';
import cn from 'classnames';
import {TopicType} from '../TopicList/TopicList';
import s from './topic.module.scss';

export default function Topic({
  topic_name,
  user,
  last_message,
  response_count,
  last_date,
}: TopicType): ReactElement<TopicType> {
  return (
    <div className={s.topic}>
      <div className={cn(s.topic_name, s.pb_5)}>{topic_name}</div>
      {response_count > 0 && (
        <>
          <div className={s.pb_5}>
            <b className={s.topic_user}>{`${user}: `}</b>
            <span className={s.sub}>{last_message}</span>
          </div>
          <div className={s.pb_5}>
            <span>Ответов: </span>
            <span className={s.topic_count}>{response_count}</span>
          </div>
          <div>
            <span>Последний: </span>
            <span className={s.sub}>{last_date}</span>
          </div>
        </>
      )}
    </div>
  );
}
