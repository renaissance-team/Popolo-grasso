import React, {ReactElement} from 'react';
import cn from 'classnames';

import {DEFAULT_PLAYER_NAME} from '@/pages/consts';
import {LeaderType} from '@/components/Game/api/createLeaderboardResult';
import style from './leaderboardItem.module.scss';

export type LeaderboardItemPropsType = Partial<LeaderType> & {rating?: number};

export default function LeaderboardItem({
  popolo_grasso_display_name,
  popolo_grasso_points,
  popolo_grasso_avatar,
  popolo_grasso_geo,
  popolo_grasso_date,
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
      {popolo_grasso_geo && (
        <div className={cn(style.leaderboard_cell, style['fs-10'], style['fbasis-300'])}>{popolo_grasso_geo}</div>
      )}
      <div className={cn(style.leaderboard_cell, style['color-green'])}>{popolo_grasso_points}</div>
      {popolo_grasso_date && (
        <div className={cn(style.leaderboard_cell, style['fs-14'], style['fshrink-0'])}>
          {popolo_grasso_date.toString().substring(10, 0)}
        </div>
      )}
    </div>
  );
}
