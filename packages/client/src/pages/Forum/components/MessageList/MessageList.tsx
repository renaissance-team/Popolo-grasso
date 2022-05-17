import {Button, Input} from '@/components';
import React, {ReactElement} from 'react';
import Message from '../Message/Message';
import style from './messageList.module.scss';

export type MessageType = {
  user: string;
  message: string;
  date: string;
};

export type MessageListPropsType = {
  messages: MessageType[];
};

export default function MessageList({messages}: MessageListPropsType): ReactElement<MessageListPropsType> {
  return (
    <div className={style.messages}>
      {messages?.length ? (
        <>
          <div className={style.messages_header}>Topic name</div>
          <div className={style.messages_content}>
            {messages.map((e) => (
              <Message {...e} />
            ))}
          </div>
        </>
      ) : (
        <div className={style.empty}>Здесь еще никто ничего не писал</div>
      )}
      <form className={style.messages_footer}>
        <Input label="Оставьте сообщение" />
        <Button>Отправить</Button>
      </form>
    </div>
  );
}