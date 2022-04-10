import React, {ReactElement} from 'react';
import cn from 'classnames';

import s from './forum.module.scss';
import {TopicList, MessageList} from './components';
import {topics} from './constants';

export default function Forum(): ReactElement {
  return (
    <div className={s.forum}>
      <div className={cn(s.forum, s.forum_item, s.forum_left)}>
        <TopicList topics={topics} />
      </div>
      <div className={cn(s.forum, s.forum_item, s.forum_right)}>
        <MessageList />
      </div>
    </div>
  );
}
