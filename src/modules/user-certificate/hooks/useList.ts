import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';
import { DateRange } from 'react-day-picker';

export const useUserCertificateList = (
  currentPage: number,
  pageSize: number,
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
    queryKey: ['user_certificate_list', currentPage, pageSize, courseId, region, district, date, search],
    queryFn: () => GetDatasList(currentPage, pageSize, courseId, region, district, date, search),
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
