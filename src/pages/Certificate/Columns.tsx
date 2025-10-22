import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "components/DataTableRowActions";
import { CertificateType } from "modules/certificate/types";
import { Course } from "modules/courses/types";
import { Link } from "react-router-dom";
import normalizeImgUrl from "utils/normalizeFileUrl";

interface IProps {
  getRowData: (notification: CertificateType) => void;
  setSheetOpen: (state: boolean) => void;
  setDialogOpen: (state: boolean) => void;
}

export const createDataColumns = ({
  getRowData,
  setSheetOpen,
  setDialogOpen,
}: IProps): ColumnDef<CertificateType>[] => [
  {
    accessorKey: "photo",
    header: "Icon",
    // cell: ({ row }) => {
    //   return <img src={`https://upload.ustozai-app.uz/${row.getValue('photo')}`} alt="img" width={80} height={60} style={{
    //     objectFit: "cover"
    //   }} loading="lazy" />;
    // },
    cell: ({ row }) => {
      return (
        <Link
          to={normalizeImgUrl(row.getValue("photo"))}
          className="text-blue-600"
          target="_blank"
        >
          file
        </Link>
      );
    },
  },
  {
    accessorKey: "degree",
    header: "Daraja",
  },
  {
    accessorKey: "course",
    header: "Kurs",
    cell: ({ row }) => {
      const course = row.getValue("course") as Course;
      return <> {course?.title} </>;
    },
  },

  {
    accessorKey: "id",
    header: () => <span className="sr-only">Actions</span>,
    size: 50,
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        getRowData={getRowData}
        setDialogOpen={setDialogOpen}
        setSheetOpen={setSheetOpen}
      />
    ),
  },
];
