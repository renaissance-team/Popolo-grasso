import {http} from '@/utils';

export type LeaderType = {
  popolo_grasso_display_name: string;
  popolo_grasso_points: number;
  popolo_grasso_avatar: string;
  popolo_grasso_user_id: string;
};

export type LeaderResponseType = {
  data: LeaderType;
};

export type LeaderboardRequestParamsType = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export const getLeaderboard = async (params: LeaderboardRequestParamsType): Promise<LeaderResponseType[]> => {
  const result = await http.post<LeaderboardRequestParamsType, LeaderResponseType[]>('/leaderboard/all', params);
  return result;
};
