import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/App/App';
import {startServiceWorker} from './utils/startServiceWorker';

import './api/index';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

startServiceWorker();
