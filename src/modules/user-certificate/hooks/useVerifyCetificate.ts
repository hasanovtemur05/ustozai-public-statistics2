import { useQuery } from '@tanstack/react-query';
import { get } from 'lodash';

import { getDatasList, getVerifyData, getVerifyDatasList } from '../adapters';
import { GetVerifyCertificate } from '../api';

export const useVerifyCertificate = (uniqueId: string) => {
  const initialData = {
    data: getVerifyData(),
  };
  const { data = initialData, ...args } = useQuery({
    queryKey: ['verify_cetificate', uniqueId],
    queryFn: () => GetVerifyCertificate(uniqueId),
    select: (data) => ({
      data: getVerifyData(get(data, 'data.data')),
    }),
  });

  return {
    ...data,
    ...args,
    // pagenationInfo
  };
};
