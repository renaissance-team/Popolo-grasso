import axios from 'axios';
import React, {ReactElement, useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {DEFAULT_SERVER_ERROR, ENDPOINTS} from '@/api/consts';
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
  const limit = 5;
  const [data, setData] = useState<LeaderResponseType[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchLeaderboard = async () => {
    setError(undefined);
    const body = {
      ratingFieldName: 'popolo_grasso_points',
      cursor: page,
      limit,
    };
    try {
      const response = await axios.post(`${ENDPOINTS.ROOT}/leaderboard/all`, body);
      if (response?.data?.length) {
        const result = page === 0 ? response?.data : data.concat(response?.data);
        setData(result);
        setPage(page + limit);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      setError(DEFAULT_SERVER_ERROR);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const renderLeaderboardContent = () => (
    <InfiniteScroll
      className={s.content}
      dataLength={data?.length}
      next={fetchLeaderboard}
      hasMore={hasMore}
      loader={!error ? <h4>&nbsp;Загрузка...</h4> : null}
      height={400}
      endMessage={<p style={{textAlign: 'center'}}>Это все лидеры на сегодня!</p>}
    >
      {error ? (
        <h4>{error}</h4>
      ) : (
        data?.map((leader: LeaderResponseType, rating: number) => (
          <LeaderboardItem {...leader.data} rating={rating + 1} key={leader.data.popolo_grasso_user_id} />
        ))
      )}
    </InfiniteScroll>
  );

  return (
    <div className={s.container}>
      <h2>Рейтинг игроков</h2>
      <h3>
        Лучшие игроки в
        <span> Popolo grasso</span>
      </h3>
      {renderLeaderboardContent()}
    </div>
  );
}
