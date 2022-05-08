import path from 'path';
import express from 'express';

import serverRenderMiddleware from './server-render-middleware';

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('*', serverRenderMiddleware);

export {app};
