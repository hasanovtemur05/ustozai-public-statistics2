import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import { TableActions } from 'components/TableActions';
import { Sheet } from 'components/Sheet';
import { AlertDialog } from 'components/AlertDialog';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import CustomForm from './CustomForm';
import { useDeleteInfo } from 'modules/info/hooks/useDeleteInfo';
import { useCertificatesList } from 'modules/certificate/hooks/useList';
import { CertificateType } from 'modules/certificate/types';
import { Pagination } from 'components/Pagination';

const Certificate = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<CertificateType>();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: notificationsList, isLoading ,paginationInfo } = useCertificatesList(currentPage);

  const { triggerInfoDelete } = useDeleteInfo(
    data?.id!
  );
  const getRowData = (info: CertificateType) => {
    setData(info);
  };
// demo
  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
  });

  return (
    <div>
      <TableActions
        sheetTriggerTitle="Setifikat qo'shish"
        sheetTitle="Yangi setifikat qo'shish"
        TableForm={CustomForm}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
        <DataTable columns={columns} data={notificationsList} />
         {paginationInfo && (
                    <Pagination
                      className="justify-end mt-3"
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      paginationInfo={paginationInfo}
                    />
                  )}
        
        </>
      )}

      <Sheet
        sheetTitle="Setifikatni tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <CustomForm
          certificate={data}
          setSheetOpen={setSheetOpen}
        />
      </Sheet>
      <AlertDialog
        alertTitle="Ishonchingiz komilmi?"
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerInfoDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default Certificate;
