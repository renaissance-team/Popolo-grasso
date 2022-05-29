import {Button, Input} from '@/components';
import React, {ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  fetchTopicList,
  selectTopicListData,
  selectTopicListError,
  selectTopicListIsLoading,
} from '../../redux/topicsSlice';
import Topic from '../Topic/Topic';
import style from './topicList.module.scss';
import {createTopic} from '../api/createTopic';

export type NewTopicForm = {
  topic: string;
}

const schema = yup.object().shape({
  topic: yup
    .string()
    .required('Название темы необходимо заполнить')
});

export default function TopicList(): ReactElement {
  const topics = useSelector(selectTopicListData);
  const error = useSelector(selectTopicListError);
  const loading = useSelector(selectTopicListIsLoading);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm<NewTopicForm>({resolver: yupResolver(schema), defaultValues: {topic: ''}});

  const handleLocalSubmit = handleSubmit(async (values) => {
    await createTopic({name: values.topic});
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchTopicList());
    reset({topic: ''});
  });

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
      <form className={style.create} onSubmit={handleLocalSubmit}>
        <Controller
          control={control}
          name="topic"
          render={({field}) => (
            <Input {...field} label="Тема для обсуждения" className={style.input} errorText={errors?.topic?.message} />
          )}
        />
        <Button type="submit">
          <span>+ Создать</span>
        </Button>
      </form>
      {content}
    </div>
  );
}
