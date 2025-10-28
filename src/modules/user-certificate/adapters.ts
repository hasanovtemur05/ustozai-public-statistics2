import { IUserCertificate, IVerifyCertificate } from './types';
export const getData = (item?: IUserCertificate) => {
  return {
    id: item?.id ?? '',
    file: item?.file ?? '',
    user: item?.user ? item?.user : null,
    uniqueId: item?.uniqueId ?? 0,
    course: item?.course ? item?.course : null,
    createdAt: item?.createdAt ?? '',
  };
};

export const getDatasList = (data?: IUserCertificate[]) => {
  return data?.length
    ? data.map((item) => {
        return getData(item);
      })
    : [];
};

// verify list
export const getVerifyData = (item?: IVerifyCertificate) => {
  return {
    file: item?.file ?? '',
    user: item?.user ? item?.user : null,
    course: item?.course ? item?.course : undefined,
    examStatistics: item?.examStatistics ? item?.examStatistics : undefined,
    degree: item?.degree ?? '',
  };
};

export const getVerifyDatasList = (data?: IVerifyCertificate[]) => {
  return data?.length
    ? data.map((item) => {
        return getVerifyData(item);
      })
    : [];
};
