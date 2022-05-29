import {ENDPOINTS} from '@/api/consts';
import {http} from '@/utils';

export type TopicRequestParamsType = {
  name: string;
}
export type TopicResponseType = {
  name: string,
  created_date: Date,
  topic_id: number,
}
export const createTopic = async (params: TopicRequestParamsType): Promise<TopicResponseType> => {
  const result = await http.post<TopicRequestParamsType, TopicResponseType>('/api/v1/topic', params, {
    baseURL: ENDPOINTS.SERVER_HOST,
  });
  return result;
};
