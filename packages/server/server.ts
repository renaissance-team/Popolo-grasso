import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import {expressCspHeader, NONCE, SELF} from 'express-csp-header';
import cookieParser from 'cookie-parser';
import {addApi} from './api';
import serverRenderMiddleware from './middlewares/server-render-middleware';
import {authMiddleware} from './middlewares/auth-middleware';

const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({extended: false});
const app = express();

app.use(jsonParser);
app.use(urlParser);
app.use(cookieParser());

// CSP
app.use(
  expressCspHeader({
    directives: {
      'default-src': [SELF, 'ya-praktikum.tech', 'nominatim.openstreetmap.org'],
      'script-src': [NONCE],
      'style-src': [NONCE, 'fonts.googleapis.com'],
      'font-src': ['fonts.googleapis.com', 'fonts.gstatic.com'],
      'worker-src': [NONCE],
    },
  })
);

// Sets "X-Content-Type-Options: nosniff"
app.use(helmet.noSniff());

// XSS
app.use(helmet.xssFilter());

// compression
app.use(compression({level: 5}));

// в production раздавать статику через Nginx или CDN
app.use(express.static(path.resolve(__dirname, '../client')));

addApi(app);

app.use(authMiddleware);
app.use(serverRenderMiddleware);

export {app};
