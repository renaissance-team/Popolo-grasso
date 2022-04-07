import {ROUTES} from '@/pages/consts';
import Register from '@/pages/Login/Register';
import Error404 from '@/pages/Errors/Error404';
import React, {ReactElement} from 'react';
import {Route, Routes} from 'react-router-dom';

import Auth from '../../pages/Login/Auth';
import Home from '../../pages/Home/Home';
import Profile from '../../pages/Profile/Profile';

function Router(): ReactElement {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.AUTH} element={<Auth />} />
      <Route path={ROUTES.REGISTRATION} element={<Register />} />

      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default Router;
