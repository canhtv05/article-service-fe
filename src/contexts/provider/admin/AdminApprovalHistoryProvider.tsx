import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { SquarePen } from 'lucide-react';

import { AdminApprovalHistoryType, AdminApprovalHistoryFilterType } from '@/types';
import { AdminApprovalHistoryContext } from '@/contexts/context/admin/AdminApprovalHistoryContext';
import { Status } from '@/enums';

const tooltips = [
  {
    content: 'Chỉnh sửa',
    icon: SquarePen,
    type: 'update',
    className: 'hover:stroke-yellow-500 size-5',
  },
];

const titlesTable = ['#', 'Tiêu đề', 'Tác giả', 'Thể loại', 'Ngày tạo', 'Ngày thao tác', 'Trạng thái', 'Hành động'];

const AdminApprovalHistoryProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: approvalHistory,
    isLoading,
    error,
  } = useQuery<AdminApprovalHistoryType[]>({
    queryKey: ['data_approval_history'],
    queryFn: async () => {
      const response = await axios.get('/data_approval_history.json');
      return response.data;
    },
  });

  const [data, setData] = useState<AdminApprovalHistoryType[] | undefined>(undefined);
  const [perPage, setPerPage] = useState<string>('5');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [valueFilter, setValueFilter] = useState<AdminApprovalHistoryFilterType>({
    end_date: '',
    start_date: '',
    status: Status.ALL,
    title: '',
  });

  useEffect(() => {
    if (approvalHistory) {
      setData(approvalHistory);
      setCurrentPage(1);
    }
  }, [approvalHistory]);

  const handleClearFields = () => {
    setValueFilter({
      end_date: '',
      start_date: '',
      status: Status.ALL,
      title: '',
    });
    if (!approvalHistory) return;
    setData(approvalHistory);
    setCurrentPage(1);
  };

  const handleFilters = () => {};

  const values = {
    data,
    setData,
    isLoading,
    error,
    tooltips,
    titlesTable,
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
    handleClearFields,
    valueFilter,
    setValueFilter,
    handleFilters,
  };
  return <AdminApprovalHistoryContext.Provider value={values}>{children}</AdminApprovalHistoryContext.Provider>;
};

export default AdminApprovalHistoryProvider;
