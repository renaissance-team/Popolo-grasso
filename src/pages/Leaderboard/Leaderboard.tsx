import axios from 'axios';
import React, {ReactElement, useEffect, useState} from 'react';

import LeaderboardItem from './components/LeaderboardItem/LeaderboardItem';

import s from './leaderboard.module.scss';

export type LeaderType = {
  popolo_grasso_display_name: string;
  popolo_grasso_points: number;
  popolo_grasso_avatar: string;
  popolo_grasso_user_id: string;
};

export type LeaderResponseType = {
  data: LeaderType;
};

export default function Leaderboard(): ReactElement {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<LeaderResponseType[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchLeaderboard = async () => {
    setError(undefined);
    setLoading(true);
    const body = {
      ratingFieldName: 'popolo_grasso_points',
      cursor: 0,
      limit: 10,
    };
    try {
      const response = await axios.post('https://ya-praktikum.tech/api/v2/leaderboard/all', body);
      setData(response?.data);
    } catch (e) {
      setError('Сервер недоступен');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const renderLeaderboardContent = () => {
    if (!isLoading && data.length) {
      return (
        <div className={s.content}>
          {data?.map((leader: LeaderResponseType, rating: number) => (
            <LeaderboardItem {...leader.data} rating={rating + 1} key={leader.data.popolo_grasso_user_id} />
          ))}
        </div>
      );
    }
    return <div>{error}</div>;
  };

  return (
    <div className={s.container}>
      <h2>Рейтинг игроков</h2>
      <h3>
        Лучшие игроки в
        <span>Popolo grasso</span>
      </h3>
      {isLoading ? <div>загрузка...</div> : renderLeaderboardContent()}
    </div>
  );
}
