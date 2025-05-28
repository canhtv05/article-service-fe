import { useContext, useState } from 'react';
import { Check, ClockFading, List, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import ConfirmDialog from '../ConfirmDialog';
import { Notice } from '@/enums';
import { AdminRegistrationPeriodType } from '@/types';
import { AdminRegistrationPeriodContext } from '@/contexts/context/admin/AdminRegistrationPeriodContext';
import AdminRegistrationTableWithPagination from './AdminRegistrationTableWithPagination';

const AdminRegistrationTable = () => {
  const registrationPeriod = useContext(AdminRegistrationPeriodContext);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Xử lý chọn/tắt tất cả
  const handleSelectAll = (checked: boolean, currentPageData: AdminRegistrationPeriodType[]) => {
    if (checked) {
      setSelectedRows(currentPageData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Xử lý chọn/tắt từng hàng
  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  // Kiểm tra trạng thái chọn tất cả
  const isAllSelected = (currentPageData: AdminRegistrationPeriodType[]) =>
    currentPageData.length > 0 && selectedRows.length === currentPageData.length;

  const handleAssign = () => {
    toast.success(Notice.UPDATE_SUCCESS);
    setSelectedRows([]);
    registrationPeriod?.setData((prev) => {
      if (!prev) return [];
      return prev.filter((article) => !selectedRows.includes(article.id));
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
      <div className="flex gap-3 items-center justify-between mb-10 lg:flex-row flex-col">
        <div className="flex gap-3 items-center w-full">
          <List />
          <span className="text-foreground text-[18px]">Danh sách đợt đăng ký</span>
        </div>
        <div className="grid grid-cols-2 lg:flex lg:flex-row gap-2 w-full">
          <Button customize={'default'} className="py-5 rounded-full">
            <ClockFading />
            Lịch sử
          </Button>
          <ConfirmDialog
            onContinue={handleAssign}
            typeTitle="mở đăng ký"
            triggerComponent={
              <Button customize={'default'} className="py-5 rounded-full" disabled={selectedRows.length === 0}>
                <Check />
                Mở đăng ký
              </Button>
            }
          />
          <ConfirmDialog
            onContinue={handleAssign}
            typeTitle="đóng đăng ký"
            triggerComponent={
              <Button customize={'default'} className="py-5 rounded-full" disabled={selectedRows.length === 0}>
                <X />
                Đóng đăng ký
              </Button>
            }
          />

          <Button customize={'default'} className="py-5 rounded-full">
            <Plus />
            Tạo đợt đăng ký
          </Button>
        </div>
      </div>
      <AdminRegistrationTableWithPagination
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        handleSelectAll={handleSelectAll}
        handleSelectRow={handleSelectRow}
        isAllSelected={isAllSelected}
      />
    </div>
  );
};

export default AdminRegistrationTable;
