import path from 'path';
import express from 'express';

import serverRenderMiddleware from './server-render-middleware';

const app = express();

// в production раздавать статику через Nginx или CDN
app.use(express.static(path.resolve(__dirname, '../client')));

app.get('*', serverRenderMiddleware); // /*

export {app};
