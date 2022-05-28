import {Express} from 'express';
import {getTopics} from '../db';

export const addApi = (app: Express) => {
  app.get('/api/v1/topics', async (req, res) => {
    // TODO тут надо пробросить норм порт и хост бд, наверно надо файл env создать с конфигами
    const data = await getTopics('localhost', 5432);
    res.json(data);
  });
};
