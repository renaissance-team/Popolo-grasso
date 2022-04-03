import {ROUTES} from '@/pages/consts';
import Register from '@/pages/Login/Register';
import React, {ReactElement} from 'react';
import {Route, Routes} from 'react-router-dom';

import Home from '../../pages/Home/Home';
import Auth from '../../pages/Login/Auth';

function Router(): ReactElement {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.AUTH} element={<Auth />} />
      <Route path={ROUTES.REGISTRATION} element={<Register />} />
    </Routes>
  );
}

export default Router;
