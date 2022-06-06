import React, {ReactElement} from 'react';
import cn from 'classnames';

import {DEFAULT_PLAYER_NAME} from '@/pages/consts';
import style from './leaderboardItem.module.scss';
import {LeaderType} from '../../api/getLeaderboard';

export type LeaderboardItemPropsType = Partial<LeaderType> & {rating?: number};

export default function LeaderboardItem({
  popolo_grasso_display_name,
  popolo_grasso_points,
  popolo_grasso_avatar,
  rating,
}: LeaderboardItemPropsType): ReactElement<LeaderboardItemPropsType> {
  const leaderClass = cn(style.leaderboard_row, {[style.leaderboard_row_win]: rating === 1});
  const leaderName = popolo_grasso_display_name || DEFAULT_PLAYER_NAME;

  return (
    <div className={leaderClass}>
      <div className={style.leaderboard_cell}>{rating}</div>
      {popolo_grasso_avatar && (
        <div className={style.leaderboard_cell}>
          <img src={popolo_grasso_avatar} className={style.avatar} alt="avatar" />
        </div>
      )}
      <div className={style.leaderboard_cell}>{leaderName}</div>
      <div className={style.leaderboard_cell}>{popolo_grasso_points}</div>
    </div>
  );
}
