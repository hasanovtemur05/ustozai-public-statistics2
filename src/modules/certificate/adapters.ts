import { CertificateType } from './types';
export const getData = (item?: CertificateType) => {
  return {
    id: item?.id ?? '',
    photo: item?.photo ?? '',
    course: item?.course ?? '',
    courseId: item?.courseId ?? '',
    date: item?.date ?? '',
    degree: item?.degree ?? '',
  };
};

export const getDatasList = (data?: CertificateType[]) => {
  return data?.length
    ? data.map(item => {
      return getData(item);
    })
    : [];
};
