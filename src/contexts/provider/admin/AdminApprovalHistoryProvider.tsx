import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Eye } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { AdminApprovalHistoryFilterType, AdminApproveHistoryResponseType } from '@/types';
import { AdminApprovalHistoryContext } from '@/contexts/context/admin/AdminApprovalHistoryContext';
import { httpRequest } from '@/utils/httpRequest';

const tooltips = [
  {
    content: 'Xem',
    icon: Eye,
    type: 'update',
    className: 'hover:stroke-yellow-500 size-5',
  },
];

const titlesTable = ['#', 'Tiêu đề', 'Tác giả', 'Thể loại', 'Ngày tạo', 'Ngày thao tác', 'Trạng thái', 'Hành động'];

const AdminApprovalHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const sizeFromUrl = Number(searchParams.get('size')) || 5;
  const title = searchParams.get('title') || '';
  const status = searchParams.get('status') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  const [data, setData] = useState<AdminApproveHistoryResponseType | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState<string>(sizeFromUrl.toString());
  const [valueFilter, setValueFilter] = useState<AdminApprovalHistoryFilterType>({
    status,
    title,
    startDate,
    endDate,
  });

  useEffect(() => {
    setValueFilter({
      status,
      title,
      startDate,
      endDate,
    });
    setCurrentPage(pageFromUrl);
    setPerPage(sizeFromUrl.toString());
  }, [endDate, pageFromUrl, searchParams, sizeFromUrl, startDate, status, title]);

  const {
    data: approveArticle,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['/admin/bai-viet/lich-su-phe-duyet', currentPage, perPage, title, status, startDate, endDate],
    queryFn: async () => {
      const params: Record<string, string> = {
        page: currentPage.toString(),
        size: perPage,
      };
      if (title) params.title = title;
      if (status) params.status = status;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await httpRequest.get('/admin/bai-viet/lich-su-phe-duyet', {
        params,
      });

      return response.data;
    },
  });

  useEffect(() => {
    if (approveArticle) {
      setData(approveArticle);
    }
  }, [approveArticle]);

  const handleClearFields = () => {
    setValueFilter({
      status: '',
      title: '',
      startDate: '',
      endDate: '',
    });
    setSearchParams({ page: '1', size: perPage });
    setCurrentPage(1);
  };

  const handleFilters = () => {
    const query: Record<string, string> = {
      page: '1',
      size: perPage,
    };

    if (valueFilter.title) query.title = valueFilter.title;
    if (valueFilter.status) query.status = valueFilter.status;
    if (valueFilter.startDate) query.startDate = valueFilter.startDate;
    if (valueFilter.endDate) query.endDate = valueFilter.endDate;

    setSearchParams(query);
    setCurrentPage(1);
  };

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
