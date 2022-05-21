import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
// import {hot} from 'react-hot-loader';
import App from '@/components/App/App';

import {Provider} from 'react-redux';
import store from '@/store';
// import {startServiceWorker} from './utils/startServiceWorker';

import './api/index';
import './index.scss';
import {BrowserRouter} from 'react-router-dom';

// const container = document.getElementById('root') as Element;

// export default renderRoot(
//   container,
//   <StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </StrictMode>
// );

const root = createRoot(document.getElementById('root') as Element);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

// startServiceWorker();
