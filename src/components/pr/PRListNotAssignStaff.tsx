import { useState } from 'react';
import { List, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import PRListNotAssignStaffTableWithPagination from './PRListNotAssignStaffTableWithPagination';
import ConfirmDialog from '../ConfirmDialog';
import { PRStaffsType } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import { useParams } from 'react-router-dom';
import { handleMutationError } from '@/utils/handleMutationError';

interface ValueAssign {
  articleId: string;
  assigneeId: string;
}

const PRListNotAssignStaff = () => {
  const { id } = useParams();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const queryClient = useQueryClient();

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

  const isAllSelected = (currentPageData: PRStaffsType[]) =>
    currentPageData.length > 0 && selectedRows.length === currentPageData.length;

  const assignMutation = useMutation({
    mutationKey: ['assign'],
    mutationFn: async (data: ValueAssign) => await httpRequest.post('/admin/bai-viet/phan-cong-nhan-vien', data),
  });

  const handleAssign = () => {
    if (!id) return;

    try {
      Promise.all(
        selectedRows.map((s) => {
          const data: ValueAssign = {
            assigneeId: id,
            articleId: s,
          };

          assignMutation.mutateAsync(data);
        }),
      );
      queryClient.invalidateQueries({ queryKey: ['/chu-de/bai-viet-cho-phan-cong'] });
      toast.success('Phân công thành công');
      setSelectedRows([]);
    } catch (error) {
      handleMutationError(error);
    }
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
