import {Button, Input} from '@/components';
import React, {ReactElement} from 'react';
import Topic from '../Topic/Topic';
import style from './topicList.module.scss';

export type TopicType = {
  topic_id: number;
  topic_name: string;
  user?: string;
  last_message?: string;
  response_count: number;
  last_date?: string;
};

export type TopicListPropsType = {
  topics: TopicType[];
};

export default function TopicList({topics}: TopicListPropsType): ReactElement<TopicListPropsType> {
  return (
    <div className={style.topics}>
      <form className={style.create}>
        <Input label="Тема для обсуждения" />
        <Button>
          <span>+ Создать</span>
        </Button>
      </form>
      {topics?.length ? (
        <div className={style.topics_content}>
          {topics.map((e) => (
            <Topic {...e} key={e.topic_id} />
          ))}
        </div>
      ) : (
        <div className={style.empty}>Создайте первую тему</div>
      )}
    </div>
  );
}
