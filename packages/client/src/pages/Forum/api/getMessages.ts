import {ENDPOINTS} from '@/api/consts';
import {http} from '@/utils';

export type MessagesResponseType = {
  topic_id: number;
  text: string;
  user: string;
  message_id: number;
  date: Date;
};

export type MessagesRequestParamsType = {
  topic_id: string;
};

export const getMessages = async (params: MessagesRequestParamsType): Promise<MessagesResponseType[]> => {
  const {topic_id} = params;
  const result = await http.get<MessagesRequestParamsType, MessagesResponseType[]>(
    `/api/v1/topic/${topic_id}/message`,
    {baseURL: ENDPOINTS.SERVER_HOST}
  );
  return result;
};
