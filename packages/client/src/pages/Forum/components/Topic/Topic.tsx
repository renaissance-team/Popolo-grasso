/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {ReactElement} from 'react';
import cn from 'classnames';
import {useDispatch} from 'react-redux';
import style from './topic.module.scss';
import {ForumTopicResponseType} from '../../api/getTopicList';
import {setSelectedTopic, fetchMessages} from '../../redux/messagesSlice';

export default function Topic({
  name,
  user,
  text,
  date,
  created_date,
  topic_id,
}: ForumTopicResponseType): ReactElement<ForumTopicResponseType> {
  const dispatch = useDispatch();
  const onKeyPressHandler = () => {
    dispatch(setSelectedTopic({topicId: topic_id, topicName: name}));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchMessages({topic_id}));
  };
  return (
    <div className={style.topic} onClick={onKeyPressHandler}>
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
