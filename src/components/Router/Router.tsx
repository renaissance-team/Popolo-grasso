import React, {ReactElement} from 'react';
import {Route, Routes} from 'react-router-dom';

import Home from '../../pages/Home/Home';

function Router(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default Router;
