import {ENDPOINTS} from '@/api/consts';
import {LeaderType} from '@/components/Game/api/createLeaderboardResult';
import {http} from '@/utils';

export type LeaderResponseType = {
  data: LeaderType;
};

export type LeaderboardRequestParamsType = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export const getLeaderboard = async (params: LeaderboardRequestParamsType): Promise<LeaderResponseType[]> => {
  const result = await http.post<LeaderboardRequestParamsType, LeaderResponseType[]>('/leaderboard/all', params, {
    baseURL: ENDPOINTS.ROOT,
  });
  return result;
};
