import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getUserCourseData } from '../adapters';
import { GetUserCourseInfo } from '../api';

export const useGetUserCourseInfo = (userId?: string, courseId?: string) => {
  const initialData = {
    data: getUserCourseData(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['user_half_course_info', userId, courseId],
    queryFn: () => GetUserCourseInfo(userId, courseId),
    select: (data) => ({
      data: getUserCourseData(get(data, 'data.data')),
    }),
    enabled: Boolean(userId && courseId),
  });
  return {
    ...data,
    ...args,
  };
};
