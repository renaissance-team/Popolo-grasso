import React, {StrictMode, FC} from 'react';
import {hydrate} from 'react-dom';
import {hot} from 'react-hot-loader';
import App from '@/components/App/App';

import {Provider} from 'react-redux';
import store from '@/store';
import {startServiceWorker} from './utils/startServiceWorker';

import './api/index';
import './index.scss';

const Client: FC<any> = hot(() => (
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
));

export default hydrate(<Client />, document.getElementById('root'));

startServiceWorker();
