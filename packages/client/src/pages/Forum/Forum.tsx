import React, {ReactElement} from 'react';

import style from './forum.module.scss';
import {TopicList, MessageList} from './components';

export default function Forum(): ReactElement {
  return (
    <div className={style.forum}>
      <div className={style.forum_item}>
        <TopicList />
      </div>
      <div className={style.forum_item}>
        <MessageList />
      </div>
    </div>
  );
}
