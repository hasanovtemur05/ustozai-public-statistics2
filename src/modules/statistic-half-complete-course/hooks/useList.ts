import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';
import { DateRange } from 'react-day-picker';
import { UserTypeFilter } from '../types';

export const useUserByHalfCourse = (
  currentPage: number,
  pageSize: number,
  type: UserTypeFilter,
  courseId?: string,
  region?: string,
  district?: string,
  date?: DateRange,
  search?: string
) => {
  const initialData = {
    data: getDatasList(),
    pagenationInfo: null,
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['user_helf_course', currentPage, pageSize, type, courseId, region, district, date, search],
    queryFn: () => GetDatasList(currentPage, pageSize, type, courseId, region, district, date, search),
    select: (data) => ({
      data: getDatasList(get(data, 'data.data.data')),
      pagenationInfo: get(data, 'data.data.meta.pagination'),
    }),
  });
  return {
    ...data,
    ...args,
    // pagenationInfo
  };
};
