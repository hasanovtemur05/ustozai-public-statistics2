import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus, Search } from 'lucide-react';
import { Sheet } from './Sheet';
import { useState } from 'react';

interface IProps {
  sheetTriggerTitle?: string;
  sheetTitle?: string;
  lastDataOrder?: number;
  TableForm?: any;
  isAddButtonHidden?: boolean;
  children?: React.ReactNode;
}

export const TableActions = ({ sheetTriggerTitle, sheetTitle, lastDataOrder, TableForm, isAddButtonHidden, children }: IProps) => {
  const [isSheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Qidirish..." />
        <Button size="icon">
          <Search className="size-4" />
        </Button>
      </div>

      <div className="flex   items-center gap-2">
        {!isAddButtonHidden && (
          <Button onClick={() => setSheetOpen(true)}>
            <Plus className="size-4 mr-2" />
            {sheetTriggerTitle}
          </Button>
        )}
        {children}
      </div>

      <Sheet sheetTitle={sheetTitle} isOpen={isSheetOpen} setSheetOpen={setSheetOpen}>
        <TableForm lastDataOrder={lastDataOrder} setSheetOpen={setSheetOpen} />
      </Sheet>
    </div>
  );
};
