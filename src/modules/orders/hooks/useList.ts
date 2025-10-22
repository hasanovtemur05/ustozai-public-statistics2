import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList } from '../adapters';
import { GetDatasList } from '../api';
import { OrderType } from '../types';

export const useOredersList = (currentPage: number, type:string) => {
  const initialData = {
    data: getDatasList(),
    pagenationInfo: {
      total_pages: 0,
      prev_page: 0,
      next_page: 0,
      current_page: 1,
    },
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['order_list', currentPage, type],
    queryFn: () => GetDatasList(currentPage, type),
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
