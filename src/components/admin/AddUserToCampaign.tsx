import { useContext, useState } from 'react';
import { toast } from 'sonner';

import { Notice } from '@/enums';
import { AddUserToCampaignType } from '@/types';
import { PRStaffsContext } from '@/contexts/context/pr/PRStaffsContext';
import AddUserToCampaignWithPagination from './AddUserToCampaignWithPagination';

const AddUserToCampaign = () => {
  const articles = useContext(PRStaffsContext);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Xử lý chọn/tắt tất cả
  const handleSelectAll = (checked: boolean, currentPageData: AddUserToCampaignType[]) => {
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
  const isAllSelected = (currentPageData: AddUserToCampaignType[]) =>
    currentPageData.length > 0 && selectedRows.length === currentPageData.length;

  const handleAssign = () => {
    toast.success(Notice.UPDATE_SUCCESS);
    setSelectedRows([]);
    articles?.setData((prev) => {
      if (!prev) return [];
      return prev.filter((article) => !selectedRows.includes(article.article_id));
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-md text-foreground h-full">
      <AddUserToCampaignWithPagination
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        handleSelectAll={handleSelectAll}
        handleSelectRow={handleSelectRow}
        isAllSelected={isAllSelected}
        handleAssign={handleAssign}
      />
    </div>
  );
};

export default AddUserToCampaign;
