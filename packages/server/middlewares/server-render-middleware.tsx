import React from 'react';
import {renderToString} from 'react-dom/server';
import {Request, Response} from 'express';
import {StaticRouter} from 'react-router-dom/server';
import {Provider} from 'react-redux';
import App from '../../client/src/components/App/App';
import store from '../../client/src/store/index';

function getHtml(reactHtml: string, reduxState = {}, nonce = '') {
  return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="shortcut icon" type="image/png" href="/images/favicon.png" nonce="${nonce}">
              <title>Popolo grasso</title>
              <link href="./main.css" rel="stylesheet" nonce="${nonce}">
          </head>
          <body>
              <div id="root">${reactHtml}</div>
              <script nonce="${nonce}">
                  window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
              </script>
              <script src="./main.js" nonce="${nonce}"></script>
          </body>
          </html>
      `;
}

interface ICustomRequest extends Request {
  nonce?: string;
}
export default (req: ICustomRequest, res: Response) => {
  const {url, nonce} = req;
  const jsx = (
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );
  const reactHtml = renderToString(jsx);
  const reduxState = store.getState();

  res.send(getHtml(reactHtml, reduxState, nonce));
};
