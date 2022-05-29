/* eslint-disable no-tabs */
import {connect} from './connecton';
import {
  MessageType, ForumTopicResponseType, TopicResponseType, MessageResponseType
} from './types';

export const getTopics = (host: string, port: number) => new Promise<ForumTopicResponseType[]>((resolve, reject) => {
  connect(host, port).query(
    'SELECT * FROM popolo.forum_topics',
    (error: any, results: { rows: ForumTopicResponseType[]; }) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    }
  );
});

// eslint-disable-next-line max-len
export const getMessages = (host: string, port: number, topic_id: number) => new Promise<MessageResponseType[]>((resolve, reject) => {
  connect(host, port).query(
    `SELECT * FROM popolo.message as m
    WHERE m.topic_id = $1`,
    [topic_id],
    (error: any, results: { rows: MessageResponseType[]; }) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    }
  );
});

// eslint-disable-next-line max-len
export const createTopic = (host: string, port: number, name: string) => new Promise<TopicResponseType[]>((resolve, reject) => {
  connect(host, port).query(
    `INSERT INTO popolo.topic (name, created_date)
    VALUES ($1, $2)
    RETURNING *`,
    [name, new Date()],
    (error: any, results: { rows: TopicResponseType[]; }) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    }
  );
});

export const createMessage = (host: string, port: number, message: MessageType) => new Promise((resolve, reject) => {
  const {topic_id, text, user} = message;
  connect(host, port).query(
    `INSERT INTO popolo.message (topic_id, text, date, "user")
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [topic_id, text, new Date(), user],
    (error: any, results: { rows: unknown; }) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    }
  );
});

// eslint-disable-next-line max-len
export const deleteMessage = (host: string, port: number, message_id: number) => new Promise<MessageResponseType[]>((resolve, reject) => {
  connect(host, port).query(
    `DELETE FROM popolo.message
    WHERE message_id = $1
    RETURNING *`,
    [message_id],
    (error: any, results: { rows: MessageResponseType[]; }) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    }
  );
});
