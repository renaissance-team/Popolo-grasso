import React, {ReactElement} from 'react';
import cn from 'classnames';

import {LeaderType} from '../../Leaderboard';

import s from './leaderboardItem.module.scss';

export type LeaderboardItemPropsType = Partial<LeaderType> & {rating?: number};

export default function LeaderboardItem({
  popolo_grasso_display_name,
  popolo_grasso_points,
  popolo_grasso_avatar,
  rating,
}: LeaderboardItemPropsType): ReactElement<LeaderboardItemPropsType> {
  const leaderClass = cn(s.leaderboard_row, {[s.leaderboard_row_win]: rating === 1});
  return (
    <div className={leaderClass}>
      <div className={cn(s.rating, s.leaderboard_cell)}>{rating}</div>
      <img src={popolo_grasso_avatar} className={cn(s.avatar, s.leaderboard_cell)} alt="avatar" />
      <div className={cn(s.display_name, s.leaderboard_cell)}>{popolo_grasso_display_name}</div>
      <div className={cn(s.points, s.leaderboard_cell)}>{popolo_grasso_points}</div>
    </div>
  );
}
