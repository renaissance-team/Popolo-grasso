import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from '@/components/App/App';
import {startServiceWorker} from './utils/startServiceWorker';

import './api/index';
import './index.scss';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

startServiceWorker();
