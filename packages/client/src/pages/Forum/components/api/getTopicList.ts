import {ENDPOINTS} from '@/api/consts';
import {http} from '@/utils';

export type ForumTopicResponseType = {
  name: string;
  created_date: Date;
  topic_id: number;
  message_id: number,
  text: string,
  date: Date,
  user: string,
};

export const getTopicList = async (): Promise<ForumTopicResponseType[]> => {
  const result = await http.get<unknown, ForumTopicResponseType[]>('/api/v1/topic', {
    baseURL: ENDPOINTS.SERVER_HOST,
  });
  return result;
};
