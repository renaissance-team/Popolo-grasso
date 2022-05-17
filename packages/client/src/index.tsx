import React, {StrictMode} from 'react';
import {hydrate} from 'react-dom';
import App from '@/components/App/App';

import {Provider} from 'react-redux';
import store from '@/store';
import {startServiceWorker} from './utils/startServiceWorker';

import './api/index';
import './index.scss';

export default hydrate(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

startServiceWorker();
