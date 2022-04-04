import Error404 from '@/pages/Errors/Error404';
import React, {ReactElement} from 'react';
import {Route, Routes} from 'react-router-dom';

import Home from '../../pages/Home/Home';
import Game from '../Game/Game';

function Router(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error404 />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default Router;
