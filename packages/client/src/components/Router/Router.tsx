import React, {ReactElement} from 'react';
import {Route, Routes} from 'react-router-dom';

import {useAppSelector} from '@/utils';
import {ROUTES} from '@/pages/consts';
import Register from '@/pages/Login/Register';
import Error404 from '@/pages/Errors/Error404';
import Home from '@/pages/Home/Home';
import Auth from '@/pages/Login/Auth';
import Leaderboard from '@/pages/Leaderboard/Leaderboard';
import Profile from '@/pages/Profile/Profile';
import Forum from '@/pages/Forum/Forum';
import Game from '@/components/Game/Game';
import Private from './Private';

function Router(): ReactElement {
  const {isAuth} = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.AUTH} element={<Private Component={Auth} allowed={!isAuth} redirect={ROUTES.HOME} />} />
      <Route
        path={ROUTES.REGISTRATION}
        element={<Private Component={Register} allowed={!isAuth} />}
      />
      <Route path={ROUTES.LEADERBOARD} element={<Private Component={Leaderboard} allowed={isAuth} />} />
      <Route path={ROUTES.PROFILE} element={<Private Component={Profile} allowed={isAuth} />} />
      <Route path={ROUTES.FORUM} element={<Private Component={Forum} allowed={isAuth} />} />
      <Route path={ROUTES.GAME} element={<Private Component={Game} allowed={isAuth} />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default Router;
