import { useState } from 'react';
import { DataTable } from 'components/DataTable';
import Loader from 'components/Loader';
import { createDataColumns } from './Columns';
import { Pagination } from 'components/Pagination';
import { useOredersList } from 'modules/orders/hooks/useList';
import { IOrder, OrderType } from 'modules/orders/types';

import { AlertDialog } from 'components/AlertDialog';
import { useDeleteOrder } from 'modules/orders/hooks/useDelete';
import SelectWithoutForm from 'components/fields/SelectWithoutForm';

const typeData = [
  { id: OrderType.ACTIVE, name: 'Faolar' },
  { id: OrderType.ALL, name: 'Barchasi' },
  { id: OrderType.DELETED, name: "O'chirilgan" },
];

const OrdersPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<IOrder>();
  const [orderType, setOrderType] = useState<string>(OrderType.ACTIVE);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: orders, isLoading, pagenationInfo } = useOredersList(currentPage, orderType);

  const { triggerOrderDelete } = useDeleteOrder(data?.id!);
  const getRowData = (info: IOrder) => {
    setData(info);
  };

  // demo
  const columns = createDataColumns({
    getRowData,
    setDialogOpen,
    setSheetOpen,
    currentPage,
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Jami {pagenationInfo?.count || 0} ta </h2>
        <SelectWithoutForm data={typeData} placeholder="Holat bo'yicha..." onChange={(value) => setOrderType(value)} />

        <h1 className="text-2xl font-bold">Buyurtmalar</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable columns={columns} data={orders} />
          <Pagination className="justify-end mt-3" currentPage={currentPage} setCurrentPage={setCurrentPage} paginationInfo={pagenationInfo} />
        </>
      )}

      <AlertDialog
        alertTitle="Ishonchingiz komilmi? "
        alertDescription="Bu harakat orqali siz ma'lumotni o'chirib tashlaysiz."
        alertCancel="Bekor qilish"
        alertActionTitle="Davom etish"
        alertActionFunction={triggerOrderDelete}
        isOpen={isDialogOpen}
        setIsOpen={setDialogOpen}
      />
    </div>
  );
};

export default OrdersPage;
