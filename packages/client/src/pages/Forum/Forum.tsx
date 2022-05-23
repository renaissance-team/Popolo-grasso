import React, {ReactElement} from 'react';

import style from './forum.module.scss';
import {TopicList, MessageList} from './components';
import {topics, messages} from './constants';

export default function Forum(): ReactElement {
  return (
    <div className={style.forum}>
      <div className={style.forum_item}>
        <TopicList topics={topics} />
      </div>
      <div className={style.forum_item}>
        <MessageList messages={messages} />
      </div>
    </div>
  );
}
