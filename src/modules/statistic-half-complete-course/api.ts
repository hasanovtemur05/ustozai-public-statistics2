import { DateRange } from 'react-day-picker';
import http from 'services/api';
import { cleanEmptyStrings } from 'utils/clearEmptyKeys';

export const GetDatasList = async (
  pageNumber: number,
  pageSize: number,
  courseId?: string,
  region?: string,
  district?: string,
  date?: DateRange,
  search?: string
) => {
  const startDate = date?.from ? date.from?.toISOString() : '';
  const endDate = date?.to ? date.to?.toISOString() : '';

  const params = {
    courseId,
    pageNumber,
    pageSize,
    region,
    district,
    startDate,
    endDate,
    search: search?.trim() || undefined,
  };

  return await http.get(`/agency/users/with/half/complete/course`, {
    params: cleanEmptyStrings(params),
  });
};

export const GetUserCourseInfo = async (userId?: string, courseId?: string) => {
  return await http.get(`/agency/user/course/progress`, {
    params: { userId, courseId },
  });
};
