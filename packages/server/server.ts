import path from 'path';
import express from 'express';
import {addApi} from './api';

import serverRenderMiddleware from './render/server-render-middleware';

const app = express();

// в production раздавать статику через Nginx или CDN
app.use(express.static(path.resolve(__dirname, '../client')));

addApi(app);

app.get('*', serverRenderMiddleware);

export {app};
