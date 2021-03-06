import React, {StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from '@/components/App/App';

import {Provider} from 'react-redux';
import store from '@/store';
import {startServiceWorker} from './utils/startServiceWorker';

import './api/index';
import './index.scss';

const container = document.getElementById('root') as Element;

export default hydrateRoot(
  container,
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

startServiceWorker();
