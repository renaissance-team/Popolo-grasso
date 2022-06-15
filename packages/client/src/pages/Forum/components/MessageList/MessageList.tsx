import {Button, Input} from '@/components';
import React, {ReactElement} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {selectUserData} from '@/store/user/reducer';
import {DEFAULT_PLAYER_NAME} from '@/pages/consts';
import Message from '../Message/Message';
import style from './messageList.module.scss';
import {
  selectMessagesData,
  selectMessagesIsLoading,
  selectMessagesError,
  selectSelectedTopic,
  fetchMessages
} from '../../redux/messagesSlice';
import {createMessage} from '../../api/createMessage';

export type NewMessageForm = {
  text: string;
}

const schema = yup.object().shape({
  text: yup
    .string()
    .required('Текст сообщения необходимо заполнить')
    .max(200, 'Максимальная длина сообщения 200 символов'),
});

export default function MessageList(): ReactElement {
  const messages = useSelector(selectMessagesData);
  const error = useSelector(selectMessagesError);
  const loading = useSelector(selectMessagesIsLoading);
  const selectedTopic = useSelector(selectSelectedTopic);
  const {topicName, topicId} = selectedTopic;
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm<NewMessageForm>({
    resolver: yupResolver(schema),
    defaultValues: {text: ''},
  });

  const handleLocalSubmit = handleSubmit(async (values) => {
    await createMessage({
      text: values.text,
      user: user.display_name || DEFAULT_PLAYER_NAME,
      topic_id: topicId as number,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchMessages({topic_id: topicId}));
    reset({text: ''});
  });

  let content;
  if (loading) {
    content = <p className={style.empty}>Загрузка сообщений...</p>;
  } else if (!loading && error) {
    content = <p className={style.empty}>{error}</p>;
  } else {
    content = (
      <>
        <div className={style.messages_header}>{topicName}</div>
        {messages?.length ? (
          <div className={style.messages_content}>
            {messages.map((e) => (
              <Message {...e} key={e.message_id} />
            ))}
          </div>
        ) : (
          <div className={style.empty}>Здесь еще никто ничего не писал</div>
        )}
      </>
    );
  }

  return (
    <div className={style.messages}>
      {content}
      <form className={style.messages_footer} onSubmit={handleLocalSubmit}>
        <Controller
          control={control}
          name="text"
          render={({field}) => (
            <Input {...field} label="Оставьте сообщение" className={style.input} errorText={errors?.text?.message} />
          )}
        />
        <Button type="submit" className={style.button}>Отправить</Button>
      </form>
    </div>
  );
}
