import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import {addApi} from './api';
import serverRenderMiddleware from './render/server-render-middleware';

const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded({extended: false});
const app = express();

app.use(jsonParser);
app.use(urlParser);

// в production раздавать статику через Nginx или CDN
app.use(express.static(path.resolve(__dirname, '../client')));

addApi(app);

app.get('*', serverRenderMiddleware);

export {app};
