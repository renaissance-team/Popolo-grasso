import React, {ReactElement} from 'react';

import LeaderboardItem from './components/LeaderboardItem/LeaderboardItem';

import s from './leaderboard.module.scss';

const users = [
  {
    popolo_grasso_display_name: 'User1',
    popolo_grasso_points: 200,
    popolo_grasso_avatar: 'https://ya-praktikum.tech/api/v2/uploads/d0bf0580-c2fe-47fd-9a62-415ed11e7e13/cat.jpeg',
    popolo_grasso_user_id: '123',
  },
  {
    popolo_grasso_display_name: 'User2',
    popolo_grasso_points: 100,
    popolo_grasso_avatar: 'https://ya-praktikum.tech/api/v2/uploads/d0bf0580-c2fe-47fd-9a62-415ed11e7e13/cat.jpeg',
    popolo_grasso_user_id: '124',
  },
];

export type LeaderType = {
  popolo_grasso_display_name: string;
  popolo_grasso_points: number;
  popolo_grasso_avatar: string;
  popolo_grasso_user_id: string;
};

export default function Leaderboard(): ReactElement {
  return (
    <div className={s.container}>
      <h2>Рейтинг игроков</h2>
      <h3>
        Лучшие игроки в
        <span>Popolo grasso</span>
      </h3>
      <div className={s.content}>
        {users?.map((leader: LeaderType, rating: number) => (
          <LeaderboardItem {...leader} rating={rating + 1} key={leader.popolo_grasso_user_id} />
        ))}
      </div>
    </div>
  );
}
