import http from 'services/api';
import { IOrderInput, OrderType } from './types';

export const GetDatasList = async (currentPage: number, type: string) => {
  return await http.get(`/order?pageSize=10&pageNumber=${currentPage}&type=${type}`);
};

export const EditData = async ({ status, id }: IOrderInput) => {
  return await http.patch(`/order/${id}`, { status });
};

export const DeleteData = async (id: string) => {
  return await http.delete(`/order/${id}`);
};

export const CancelData = async (id: string) => {
  return await http.delete(`/order/cancel/${id}`);
};
