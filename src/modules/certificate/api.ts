import http from 'services/api';
import { CertificateInputType, CertificateEditBodyType } from './types';

export const GetDatasList = async (currentPage:number) => {
  return await http.get(`/certificate?pageSize=10`, {params:{pageNumber:currentPage}});
};

export const CreateData = async (values: CertificateInputType) => {
  return await http.post(`/certificate`, values);
};

export const EditData = async ({
  values,
  id,
}: CertificateEditBodyType) => {
  return await http.patch(`/certificate/${id}`, values);
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/certificate/${id}`);
};
