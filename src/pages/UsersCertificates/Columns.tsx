import { ColumnDef } from '@tanstack/react-table';
import { Button } from 'components/ui/button';
import { IUserCertificate } from 'modules/user-certificate/types';
import { calculateAge } from 'utils/calculateAge';
import { formatDateTime } from 'utils/formatDateTime';
import normalizeImgUrl from 'utils/normalizeFileUrl';

interface IProps {
  currentPage: number;
  handleShowChart: (user: IUserCertificate) => void;
}

export const createDataColumns = ({ currentPage, handleShowChart }: IProps): ColumnDef<IUserCertificate>[] => [
  {
    accessorKey: 'amount',
    header: 'T/R',
    cell: ({ row }) => row.index + 1 + (currentPage - 1) * 10,
  },
  {
    accessorKey: 'user',
    header: 'Talaba',
    cell: ({ row }) => {
      const profile = row.original.user;
      return <>{profile ? profile?.firstname + ' ' + profile?.lastname : ''}</>;
    },
  },
  {
    accessorKey: 'course',
    header: 'Kurs',
    cell: ({ row }) => <>{row.original?.course?.title} </>,
  },
  {
    accessorKey: 'user',
    header: 'Tel/Email',
    cell: ({ row }) => {
      const user = row.original.user;
      return <>{user?.phone ? user?.phone : user?.email}</>;
    },
  },
  {
    accessorKey: 'user',
    header: 'Yosh',
    cell: ({ row }) => {
      const age = calculateAge(row.original.user?.birthday || '');
      return <>{age || 'kiritilmagan'}</>;
    },
  },
  {
    accessorKey: 'adress',
    header: 'Manzil',
    cell: ({ row }) => <>{row.original?.user?.address?.region + ', ' + row.original?.user?.address?.district} </>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Berilgan sana',
    cell: ({ row }) => <>{formatDateTime(row.original.createdAt || '')} </>,
  },
  {
    accessorKey: 'file',
    header: 'Sertifikat',
    cell: ({ row }) => (
      <a href={normalizeImgUrl(row.original?.file || '')} target="_blank" className="text-blue-700">
        File
      </a>
    ),
  },

  {
    accessorKey: 'courses',
    header: 'Batafsil',
    cell: ({ row }) => {
      return <Button onClick={() => handleShowChart(row.original)}>Tekshirish </Button>;
    },
  },
];
