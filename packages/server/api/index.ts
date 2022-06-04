import {Express} from 'express';
import {
  getTopics, getMessages, createTopic, createMessage, deleteMessage
} from '../db';
import {getTheme, setTheme, getUserTheme} from '../db/theme';
import {MessageType, UserThemeType} from '../db/types';

// TODO тут надо пробросить норм порт и хост бд, наверно надо файл env создать с конфигами
const port = 5432;
const host = 'localhost';

export const addApi = (app: Express) => {
  // forum:
  // Возвращает темы форума
  app.get('/api/v1/topic', async (req, res) => {
    const data = await getTopics(host, port);
    res.json(data);
  });
  // Создает новую тему
  app.post('/api/v1/topic', async (req, res) => {
    const {name} = req.body;
    const data = await createTopic(host, port, name);
    res.json(data[0]);
  });
  // Возвращает сообщения, относящиеся к выбранной теме
  app.get('/api/v1/topic/:topic_id/message', async (req, res) => {
    const {topic_id} = req.params;
    const data = await getMessages(host, port, +topic_id);
    res.json(data);
  });
  // Добавляет новое сообщение в выбранной теме
  app.post('/api/v1/topic/:topic_id/message', async (req, res) => {
    const message: MessageType = {...req.params, ...req.body};
    const data = await createMessage(host, port, message);
    res.json(data);
  });
  // Удаляет сообщение
  app.delete('/api/v1/message/:message_id', async (req, res) => {
    const {message_id} = req.params;
    const data = await deleteMessage(host, port, +message_id);
    res.json(data);
  });

  // theme:
  // Возвращает все темы
  app.get('/api/v1/theme', async (req, res) => {
    const data = await getTheme(host, port);
    res.json(data);
  });
  // Возвращает установленную тему юзера по его id
  app.get('/api/v1/theme/:user_id', async (req, res) => {
    const {user_id} = req.params;
    const data = await getUserTheme(host, port, +user_id);
    res.json(data[0]);
  });
  // Изменить/установить тему юзера
  app.post('/api/v1/theme', async (req, res) => {
    const theme: UserThemeType = {...req.body};
    const data = await setTheme(host, port, theme);
    res.json(data[0]);
  });
};
