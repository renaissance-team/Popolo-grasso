import {Button, Input} from '@/components';
import React, {ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchTopicList,
  selectTopicListData,
  selectTopicListError,
  selectTopicListIsLoading,
} from '../../redux/topicsSlice';
import Topic from '../Topic/Topic';
import style from './topicList.module.scss';

export default function TopicList(): ReactElement {
  const topics = useSelector(selectTopicListData);
  const error = useSelector(selectTopicListError);
  const loading = useSelector(selectTopicListIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchTopicList());
  }, []);

  let content;
  if (loading) {
    content = <p className={style.empty}>Загрузка, пожалуйста, подождите...</p>;
  } else if (!loading && error) {
    content = <p className={style.empty}>{error}</p>;
  } else {
    content = topics?.length ? (
      <div className={style.topics_content}>
        {topics.map((e) => (
          <Topic {...e} key={e.topic_id} />
        ))}
      </div>
    ) : (
      <div className={style.empty}>Создайте первую тему</div>
    );
  }

  return (
    <div className={style.topics}>
      <form className={style.create}>
        <Input label="Тема для обсуждения" className={style.input} />
        <Button>
          <span>+ Создать</span>
        </Button>
      </form>
      {content}
    </div>
  );
}
