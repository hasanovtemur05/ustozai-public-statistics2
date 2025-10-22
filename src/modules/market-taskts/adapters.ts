import { IMarketTask } from './types';

export const getData = (item?: IMarketTask) => {
  return {
    id: item?.id ?? '',
    points: item?.points ?? 0,
    title: item?.title ?? '',
    photo: item?.photo ?? '',
    description: item?.description ?? '',
    createdAt: item?.createdAt ?? '',
  };
};

export const getDatasList = (data?: IMarketTask[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};
