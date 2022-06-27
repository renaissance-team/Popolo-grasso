import {ENDPOINTS} from '@/api/consts';
import {http} from '@/utils';

export type LeaderType = {
  popolo_grasso_display_name: string;
  popolo_grasso_points: number;
  popolo_grasso_avatar: string;
  popolo_grasso_user_id: number;
  popolo_grasso_geo: string | null;
  popolo_grasso_date: Date;
};
export type LeaderboardRequestType = {
  data: LeaderType;
  ratingFieldName: string;
  teamName: string;
};

export const createLeaderboardResult = async (leader: LeaderType): Promise<unknown> => {
  const params = {
    data: leader,
    ratingFieldName: 'popolo_grasso_points',
    teamName: 'renaissance',
  };
  const result = await http.post<LeaderboardRequestType, unknown>('/leaderboard', params, {baseURL: ENDPOINTS.ROOT});
  return result;
};
