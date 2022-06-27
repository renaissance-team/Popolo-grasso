import {Express} from 'express';
import {
  getTopics, getMessages, createTopic, createMessage, deleteMessage
} from '../db';
import {
  getTheme, setTheme, getUserTheme, createUserTheme
} from '../db/theme';
import {MessageType, UserThemeType} from '../db/types';

const port = 5432;
const host = 'popolo-db';

export const addApi = (app: Express) => {
  // forum:
  // Возвращает темы форума
  app.get('/api/v1/topic', async (req, res) => {
    try {
      const data = await getTopics(host, port);
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // Создает новую тему
  app.post('/api/v1/topic', async (req, res) => {
    try {
      const {name} = req.body;
      const data = await createTopic(host, port, name);
      res.json(data[0]);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // Возвращает сообщения, относящиеся к выбранной теме
  app.get('/api/v1/topic/:topic_id/message', async (req, res) => {
    try {
      const {topic_id} = req.params;
      const data = await getMessages(host, port, +topic_id);
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // Добавляет новое сообщение в выбранной теме
  app.post('/api/v1/topic/:topic_id/message', async (req, res) => {
    try {
      const message: MessageType = {...req.params, ...req.body};
      const data = await createMessage(host, port, message);
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // Удаляет сообщение
  app.delete('/api/v1/message/:message_id', async (req, res) => {
    try {
      const {message_id} = req.params;
      const data = await deleteMessage(host, port, +message_id);
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // theme:
  // Возвращает все темы
  app.get('/api/v1/theme', async (req, res) => {
    try {
      const data = await getTheme(host, port);
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // Возвращает установленную тему юзера по его id
  app.get('/api/v1/theme/:user_id', async (req, res) => {
    try {
      const {user_id} = req.params;
      if (!Number(user_id)) {
        throw new Error('user_id is invalid');
      }

      let data = await getUserTheme(host, port, +user_id);
      if (!data.length) {
        data = await createUserTheme(host, port, +user_id);
      }
      res.json(data[0]);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  // Изменить/установить тему юзера
  app.post('/api/v1/theme', async (req, res) => {
    try {
      const theme: UserThemeType = {...req.body};
      const data = await setTheme(host, port, theme);
      res.json(data[0]);
    } catch (err) {
      res.status(500).json(err);
    }
  });
};
