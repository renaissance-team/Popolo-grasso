import React, {ReactElement, useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {DEFAULT_SERVER_ERROR} from '@/api/consts';
import LeaderboardItem from './components/LeaderboardItem/LeaderboardItem';
import {getLeaderboard, LeaderResponseType} from './api/getLeaderboard';

import style from './leaderboard.module.scss';

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
      const response = await getLeaderboard(body);
      if (response?.length) {
        const result = page === 0 ? response : data.concat(response);
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
      className={style.content}
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
    <div className={style.container}>
      <h2>Рейтинг игроков</h2>
      <h3>
        Лучшие игроки в
        <span> Popolo grasso</span>
      </h3>
      {renderLeaderboardContent()}
    </div>
  );
}
