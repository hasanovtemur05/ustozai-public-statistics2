import { ColumnDef } from '@tanstack/react-table';
import { Button } from 'components/ui/button';
import { HalfCompleteCourse, HalfCompleteCourseV2, IUserHalfCompleteCourse } from 'modules/statistic-half-complete-course/types';

interface IProps {
  getRowData: (user: any) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
  currentPage: number;
  handleShowChart: (user: IUserHalfCompleteCourse) => void;
}

export const createDataColumns = ({ getRowData, setSheetOpen, setDialogOpen, currentPage, handleShowChart }: IProps): ColumnDef<any>[] => [
  {
    accessorKey: 'amount',
    header: 'T/R',
    cell: ({ row }) => row.index + 1 + (currentPage - 1) * 10,
  },
  {
    accessorKey: 'firstname',
    header: 'Talaba',
    cell: ({ row }) => {
      return <>{row.original?.firstname + ' ' + row.original.lastname}</>;
    },
  },
  {
    accessorKey: 'phone',
    header: 'Tel/Email',
    cell: ({ row }) => {
      const { phone, email } = row.original;
      return <>{phone || email || '—'}</>;
    },
  },

  {
    accessorKey: 'courses',
    header: 'Kurslar',
    cell: ({ row }) => {
      const courses = row.original.courses;
      if (!courses?.length) return <>—</>;
      return (
        <ul className="list-disc pl-4">
          {courses.map((c: HalfCompleteCourseV2) => (
            <li key={c.courseId}>
              {c.courseTitle} - {c.percentage}%
            </li>
          ))}
        </ul>
      );
    },
  },

  {
    accessorKey: 'activity',
    header: 'Faollik',
    cell: ({ row }) => {
      const activity = row.original.activity;
      if (!activity) return <>—</>;
      const { fortuna, portfolio, battle } = activity;
      const hasActivity = fortuna > 0 || portfolio > 0 || battle > 0;
      if (!hasActivity) return <>—</>;
      return (
        <div className="text-sm">
          {fortuna > 0 && <div>Fortuna: {fortuna}</div>}
          {portfolio > 0 && <div>Portfolio: {portfolio}</div>}
          {battle > 0 && <div>Battle: {battle}</div>}
        </div>
      );
    },
  },

  {
    accessorKey: 'details',
    header: 'Batafsil',
    cell: ({ row }) => {
      return <Button onClick={() => handleShowChart(row.original)}>Batafsil </Button>;
    },
  },
];
