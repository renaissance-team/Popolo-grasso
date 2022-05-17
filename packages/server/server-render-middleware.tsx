import React from 'react';
import {renderToString} from 'react-dom/server';
import {Request, Response} from 'express';
import {StaticRouter} from 'react-router-dom/server';
import {} from 'react-router';
import {Provider} from 'react-redux';
import App from '../client/src/components/App/App';
import store from '../client/src/store/index';

function getHtml(reactHtml: string, reduxState = {}) {
  return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="shortcut icon" type="image/png" href="/images/favicon.png">
              <title>Popolo grasso</title>
              <link href="/main.css" rel="stylesheet">
          </head>
          <body>
              <div id="root">${reactHtml}</div>
              <script>
                  window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
              </script>
              <script src="/main.js"></script>
          </body>
          </html>
      `;
}

export default (req: Request, res: Response) => {
  const location = req.url;
  const jsx = (
    <Provider store={store}>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </Provider>
  );
  const reactHtml = renderToString(jsx);
  const reduxState = store.getState();

  res.send(getHtml(reactHtml, reduxState));
};
