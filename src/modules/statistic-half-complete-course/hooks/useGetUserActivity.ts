import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';
import { GetUserActivityInfo } from '../api';
import { IUserActivityDetail } from '../types';

export const useUserActivity = (userId?: string) => {
  const { data, ...args } = useQuery({
    queryKey: ['user_activity', userId],
    queryFn: () => GetUserActivityInfo(userId),
    enabled: !!userId,
    select: (data) => {
      const activityData = get(data, 'data.data') as IUserActivityDetail;
      return activityData;
    },
  });

  return {
    data,
    ...args,
  };
};
