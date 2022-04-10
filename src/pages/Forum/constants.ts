export const topics = [
  {
    topic_id: 1,
    topic_name: 'Тема 1',
    user: 'User 1',
    last_message: 'Здесь текст последнего сообщения',
    response_count: 12,
    last_date: '2022-17-03',
  },
  {
    topic_id: 2,
    topic_name: 'Тема 2',
    user: 'User 2',
    last_message:
      'Здесь текст последнего сообщения, текст последнего сообщения, текст последнего сообщения, текст последнего',
    response_count: 2,
    last_date: '2022-17-03',
  },
  {
    topic_id: 3,
    topic_name: 'Тема 3',
    user: undefined,
    last_message: undefined,
    response_count: 0,
    last_date: undefined,
  },
];

export const messages = [
  {
    user: 'User1',
    message: 'Текст сообщения',
    date: '2022-11-04', // TODO formate
  },
  {
    user: 'User2',
    message: 'Текст сообщения',
    date: '2022-12-04',
  },
];

export default ''; // TODO удалить после мерджа с 43-refactoring
