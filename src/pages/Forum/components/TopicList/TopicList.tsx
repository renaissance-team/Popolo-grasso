import {Button, Input} from '@/components';
import React, {ReactElement} from 'react';
import Topic from '../Topic/Topic';
import s from './topicList.module.scss';

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
    <div className={s.container}>
      <form className={s.create}>
        <Input label="Тема для обсуждения" className={s.input} />
        <Button>
          <span>+ Создать</span>
        </Button>
      </form>
      {topics?.length ? (
        <div>
          {topics.map((e) => (
            <Topic {...e} key={e.topic_id} />
          ))}
        </div>
      ) : (
        <div className={s.empty}>Создайте первую тему</div>
      )}
    </div>
  );
}
