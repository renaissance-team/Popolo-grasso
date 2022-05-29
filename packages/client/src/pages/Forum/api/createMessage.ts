import {ENDPOINTS} from '@/api/consts';
import {http} from '@/utils';

export type MessageRequestBodyType = {
  text: string,
  user: string,
}
export type MessageRequestParamsType = {
  topic_id: number,
} & MessageRequestBodyType
export type MessageResponseType = {
  message_id: number,
  topic_id: number,
  text: string,
  user: string,
  date: Date,
}

export const createMessage = async (params: MessageRequestParamsType): Promise<MessageResponseType> => {
  const {topic_id, text, user} = params;
  const result = await http.post<MessageRequestBodyType, MessageResponseType>(
    `/api/v1/topic/${topic_id}/message`,
    {text, user},
    {
      baseURL: ENDPOINTS.SERVER_HOST,
    }
  );
  return result;
};
