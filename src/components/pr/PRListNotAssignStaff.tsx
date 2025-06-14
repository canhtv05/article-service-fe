import { useContext, useState } from 'react';
import { List, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import PRListNotAssignStaffTableWithPagination from './PRListNotAssignStaffTableWithPagination';
import ConfirmDialog from '../ConfirmDialog';
import { Notice } from '@/enums';
import { PRStaffsType } from '@/types';
import { PRStaffsContext } from '@/contexts/context/pr/PRStaffsContext';

const PRListNotAssignStaff = () => {
  const articles = useContext(PRStaffsContext);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Xử lý chọn/tắt tất cả
  const handleSelectAll = (checked: boolean, currentPageData: PRStaffsType[]) => {
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
  const isAllSelected = (currentPageData: PRStaffsType[]) =>
    currentPageData.length > 0 && selectedRows.length === currentPageData.length;

  const handleAssign = () => {
    toast.success(Notice.UPDATE_SUCCESS);
    setSelectedRows([]);
    articles?.setData((prev) => {
      if (!prev) return [];
      return prev.filter((article) => !selectedRows.includes(article.id));
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
      <div className="flex gap-3 items-center justify-between mb-10">
        <div className="flex gap-3 items-center">
          <List />
          <span className="text-foreground text-[18px]">Danh sách bài viết chưa phân công</span>
        </div>
        <ConfirmDialog
          onContinue={handleAssign}
          typeTitle="phân công"
          triggerComponent={
            <Button customize={'default'} className="py-5 rounded-full" disabled={selectedRows.length === 0}>
              <Plus />
              Phân công
            </Button>
          }
        />
      </div>
      <PRListNotAssignStaffTableWithPagination
        handleSelectAll={handleSelectAll}
        handleSelectRow={handleSelectRow}
        isAllSelected={isAllSelected}
        selectedRows={selectedRows}
      />
    </div>
  );
};

export default PRListNotAssignStaff;
