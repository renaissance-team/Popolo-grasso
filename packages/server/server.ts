import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import {expressCspHeader, NONCE, SELF} from 'express-csp-header';
import {addApi} from './api';
import serverRenderMiddleware from './render/server-render-middleware';

const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({extended: false});
const app = express();

app.use(jsonParser);
app.use(urlParser);

app.use(
  expressCspHeader({
    directives: {
      'default-src': [SELF, 'ya-praktikum.tech'],
      'script-src': [NONCE],
      'style-src': [NONCE, 'fonts.googleapis.com'],
      'font-src': ['fonts.googleapis.com', 'fonts.gstatic.com'],
      'worker-src': [NONCE],
    },
  })
);

// в production раздавать статику через Nginx или CDN
app.use(express.static(path.resolve(__dirname, '../client')));

addApi(app);

app.get('*', serverRenderMiddleware);

export {app};
