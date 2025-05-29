import { useState } from 'react';
import { Download, List, Send } from 'lucide-react';

import { Button } from '../ui/button';
import { AdminArchiveType } from '@/types';
// import { useAdminArchiveContext } from '@/contexts/context/admin/AdminArchiveContext';
import AdminArchiveTableWithPagination from './AdminArchiveTableWithPagination';

const AdminArchiveTable = () => {
  // const archive = useAdminArchiveContext();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Xử lý chọn/tắt tất cả
  const handleSelectAll = (checked: boolean, currentPageData: AdminArchiveType[]) => {
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
  const isAllSelected = (currentPageData: AdminArchiveType[]) =>
    currentPageData.length > 0 && selectedRows.length === currentPageData.length;

  // const handleAssign = () => {
  //   toast.success(Notice.UPDATE_SUCCESS);
  //   setSelectedRows([]);
  //   archive?.setData((prev) => {
  //     if (!prev) return [];
  //     return prev.filter((arc) => !selectedRows.includes(arc.id));
  //   });
  // };

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
      <div className="flex gap-3 items-center justify-between mb-10 xl:flex-row flex-col">
        <div className="flex gap-3 items-center w-full">
          <List />
          <span className="text-foreground text-[18px]">Danh sách đợt đăng ký</span>
        </div>
        <div className="grid grid-cols-3 xl:flex xl:flex-row xl:justify-end gap-2 w-full">
          <Button customize={'default'} className="py-5 rounded-full">
            Đã phê duyệt
          </Button>

          <Button customize={'default'} className="py-5 rounded-full">
            Đã gửi
          </Button>
          <Button customize={'default'} className="py-5 rounded-full">
            Đã đăng
          </Button>

          <Button customize={'default'} className="py-5 rounded-full">
            Không đăng
          </Button>
          <Button customize={'default'} className="py-5 rounded-full">
            <Download />
            Tải bài viết
          </Button>

          <Button customize={'default'} className="py-5 rounded-full">
            <Send />
            Gửi PR
          </Button>
        </div>
      </div>
      <AdminArchiveTableWithPagination
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        handleSelectAll={handleSelectAll}
        handleSelectRow={handleSelectRow}
        isAllSelected={isAllSelected}
      />
    </div>
  );
};

export default AdminArchiveTable;
