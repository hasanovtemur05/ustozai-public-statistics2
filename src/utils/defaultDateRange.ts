import { DateRange } from 'react-day-picker';

export const getDefaultDateRange = (): DateRange => {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 12);

  return {
    from: undefined,
    to: undefined,
  };
};
