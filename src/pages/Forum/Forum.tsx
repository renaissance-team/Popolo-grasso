import React, {ReactElement} from 'react';

import s from './forum.module.scss';
import {TopicList, MessageList} from './components';
import {topics, messages} from './constants';

export default function Forum(): ReactElement {
  return (
    <div className={s.forum}>
      <div className={s.forum_item}>
        <TopicList topics={topics} />
      </div>
      <div className={s.forum_item}>
        <MessageList messages={messages} />
      </div>
    </div>
  );
}
