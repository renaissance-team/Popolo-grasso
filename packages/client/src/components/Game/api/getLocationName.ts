import {http} from '@/utils';

export type LocationNameParamsType = {
  lat: number;
  lon: number;
}

export type LocationNameAllParamsType = LocationNameParamsType & {
  format: string;
}

export type LocationNameResponseType = {
  display_name: string;
};
export const getLocationName = async (params: LocationNameParamsType): Promise<string> => {
  const requestParams = {...params, format: 'json'};
  const result = await http.get<LocationNameAllParamsType, LocationNameResponseType>('/reverse', {
    baseURL: 'https://nominatim.openstreetmap.org',
    params: requestParams,
    withCredentials: false,
  });
  return result?.display_name;
};
