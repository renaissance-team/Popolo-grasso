/* eslint-disable no-console */
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

app.use('*', (req, res, next) => {
  console.log(`================================log begin ${new Date().toISOString()}================================`);
  console.log(req.url, req.params, req.body);
  console.log('================================log end================================');

  next();
});

app.use(authMiddleware);

// CSP
app.use(
  expressCspHeader({
    directives: {
      'default-src': [SELF, 'ya-praktikum.tech', 'nominatim.openstreetmap.org', 'images.hdqwalls.com'],
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

app.use(express.static(path.resolve(__dirname, '../client')));

addApi(app);

app.use(serverRenderMiddleware);

export {app};
