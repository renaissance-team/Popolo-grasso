import React, {ReactElement} from 'react';
import Message from '../Message/Message';
import s from './messageList.module.scss';

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
    <div>
      {messages?.length ? (
        messages.map((e) => <Message {...e} />)
      ) : (
        <div className={s.empty}>Здесь еще никто ничего не писал</div>
      )}
    </div>
  );
}
