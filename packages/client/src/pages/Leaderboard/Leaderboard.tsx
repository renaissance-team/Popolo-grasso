import React, {ReactElement, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {
  selectLeaderboardData,
  selectLeaderboardError,
  setRequestParams,
  selectLeaderboardHasMore,
} from './redux/LeaderboardSlice';

import LeaderboardItem from './components/LeaderboardItem/LeaderboardItem';
import {LeaderResponseType} from './api/getLeaderboard';

import style from './leaderboard.module.scss';

export default function Leaderboard(): ReactElement {
  const data = useSelector(selectLeaderboardData);
  const error = useSelector(selectLeaderboardError);
  const dispatch = useDispatch();
  const hasMore = useSelector(selectLeaderboardHasMore);

  const getLeaderboard = async () => {
    dispatch(setRequestParams() as unknown as AnyAction);
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  const renderLeaderboardContent = () => (
    <div className={style.content}>
      <InfiniteScroll
        dataLength={data?.length}
        next={getLeaderboard}
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
    </div>
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
