import { useState } from 'react';
import { List, Send } from 'lucide-react';

import { Button } from '../ui/button';
import { AdminArchiveFilterType, AdminArchiveType } from '@/types';
// import { useAdminArchiveContext } from '@/contexts/context/admin/AdminArchiveContext';
import AdminArchiveTableWithPagination from './AdminArchiveTableWithPagination';
import { useNavigate } from 'react-router-dom';
import { useAdminArchiveContext } from '@/contexts/context/admin/AdminArchiveContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import { toast } from 'sonner';

const AdminArchiveTable = () => {
  const archive = useAdminArchiveContext();
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const queryClient = useQueryClient();

  // Xử lý chọn/tắt từng hàng
  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  const handleSelectAll = (checked: boolean, currentPageData: AdminArchiveType[]) => {
    const approvedItems = currentPageData.filter((item) => item.status === 'Approved');

    if (checked) {
      setSelectedRows(approvedItems.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const isAllSelected = (currentPageData: AdminArchiveType[]) => {
    const approvedItems = currentPageData.filter((item) => item.status === 'Approved');
    if (approvedItems.length === 0) return false;

    return approvedItems.every((item) => selectedRows.includes(item.id));
  };

  type TypeStatus = 'Approved' | 'SendToPR' | 'Published' | 'Inactive' | 'AwaitingPublication';

  const buildSearchParamsWithFilters = (
    page: number,
    size: number,
    filters: AdminArchiveFilterType,
    type: TypeStatus,
  ) => {
    const params = new URLSearchParams();

    params.set('size', String(size));
    params.set('page', String(page));

    if (filters.title) params.set('title', filters.title);
    if (filters.campaignName) params.set('campaignName', filters.campaignName);
    if (filters.authorName) params.set('authorName', filters.authorName);

    params.set('status', String(type));

    return params.toString();
  };

  const sendToPrMutation = useMutation({
    mutationKey: ['sendToOPR'],
    mutationFn: async () => {
      await Promise.all(selectedRows.map((id) => httpRequest.get(`/admin/bai-viet/day-bai-viet-pr/${id}`)));
    },
    onSuccess: () => {
      setSelectedRows([]);
      queryClient.invalidateQueries({ queryKey: ['/admin/bai-viet/danh-sach-bai-viet'] });
      toast.success('Gửi PR thành công!');
    },
    onError: (error) => {
      toast.error(error.message ?? 'Có lỗi xảy ra');
    },
  });

  const handleSendToPr = () => {
    if (selectedRows.length === 0) return;
    sendToPrMutation.mutate();
  };

  if (!archive) return;
  const handleFilter = (type: TypeStatus) => {
    const queryString = buildSearchParamsWithFilters(1, 5, archive.valueFilter, type);

    navigate(`/admin/archive?${queryString}`, {
      replace: true,
    });

    setSelectedRows([]);
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
      <div className="flex gap-3 items-center justify-between mb-10 xl:flex-row flex-col">
        <div className="flex gap-3 items-center w-full">
          <List />
          <span className="text-foreground text-[18px]">Danh sách đợt đăng ký</span>
        </div>
        <div className="grid grid-cols-3 xl:flex xl:flex-row xl:justify-end gap-2 w-full">
          <Button customize={'default'} className="py-5 rounded-full" onClick={() => handleFilter('Approved')}>
            Đã phê duyệt
          </Button>

          <Button customize={'default'} className="py-5 rounded-full" onClick={() => handleFilter('SendToPR')}>
            Đã gửi
          </Button>
          <Button customize={'default'} className="py-5 rounded-full" onClick={() => handleFilter('Published')}>
            Đã đăng
          </Button>

          <Button customize={'default'} className="py-5 rounded-full" onClick={() => handleFilter('Inactive')}>
            Không đăng
          </Button>
          <Button
            customize={'default'}
            className="py-5 rounded-full"
            disabled={selectedRows.length === 0}
            onClick={handleSendToPr}
          >
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
