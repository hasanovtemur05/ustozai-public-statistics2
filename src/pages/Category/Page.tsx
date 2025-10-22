import { useState } from "react";
import { DataTable } from "components/DataTable";
import { TableActions } from "components/TableActions";
import { Sheet } from "components/Sheet";
import { AlertDialog } from "components/AlertDialog";
import Loader from "components/Loader";
import { createDataColumns } from "./Columns";
import CustomForm from "./CustomForm";
import { CategoryType } from "modules/category/types";
import { useCategoriesList } from "modules/category/hooks/useList";
import { useDeleteCategories } from "modules/category/hooks/useDelete";

const CategoryPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [data, setData] = useState<CategoryType>();

  const { data: categories, isLoading } = useCategoriesList();

  const { triggerInfoDelete } = useDeleteCategories(data?.id!);
  const getRowData = (info: CategoryType) => {
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
        sheetTriggerTitle="Kategoriya qo'shish"
        sheetTitle="Yangi kategoriya qo'shish"
        TableForm={CustomForm}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable columns={columns} data={categories} navigateTable />
      )}

      <Sheet
        sheetTitle="Kategoriyani tahrirlash"
        isOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
      >
        <CustomForm category={data} setSheetOpen={setSheetOpen} />
      </Sheet>
      <AlertDialog
        alertTitle="Ishonchingiz komilmi? "
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

export default CategoryPage;
