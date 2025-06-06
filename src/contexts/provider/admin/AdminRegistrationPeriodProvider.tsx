import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Eye, Pen, Trash } from 'lucide-react';

import { AdminRegistrationPeriodFilterType, AdminRegistrationPeriodResponseType } from '@/types';
import { AdminRegistrationPeriodContext } from '@/contexts/context/admin/AdminRegistrationPeriodContext';
import { httpRequest } from '@/utils/httpRequest';

const tooltips = [
  {
    content: 'Xem',
    icon: Eye,
    type: 'view',
    className: 'hover:stroke-green-500 size-5',
  },
  {
    content: 'Phân công chủ đề',
    icon: Pen,
    type: 'assign_topic',
    className: 'hover:stroke-yellow-500 size-5',
  },
  {
    content: 'Xóa',
    icon: Trash,
    type: 'remove',
    className: 'hover:stroke-red-500 size-5',
  },
];

const titlesTable = ['#', 'Tên', 'Thời gian', 'Thời gian đăng ký', 'Trạng thái', 'Hành động'];

const AdminRegistrationPeriodProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const sizeFromUrl = Number(searchParams.get('size')) || 5;
  const name = searchParams.get('name') || '';
  const status = searchParams.get('status') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  const [data, setData] = useState<AdminRegistrationPeriodResponseType | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState<string>(sizeFromUrl.toString());
  const [valueFilter, setValueFilter] = useState<AdminRegistrationPeriodFilterType>({
    status,
    name,
    startDate,
    endDate,
  });

  useEffect(() => {
    setValueFilter({
      status,
      name,
      startDate,
      endDate,
    });
    setCurrentPage(pageFromUrl);
    setPerPage(sizeFromUrl.toString());
  }, [endDate, pageFromUrl, searchParams, sizeFromUrl, startDate, status, name]);

  const {
    data: approveArticle,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['/dot-bai-viet/danh-sanh-dot', currentPage, perPage, name, status, startDate, endDate],
    queryFn: async () => {
      const params: Record<string, string> = {
        page: currentPage.toString(),
        size: perPage,
      };
      if (name) params.name = name;
      if (status) params.status = status;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await httpRequest.get('/dot-bai-viet/danh-sanh-dot', {
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
      name: '',
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

    if (valueFilter.name) query.name = valueFilter.name;
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
    handleFilters,
    handleClearFields,
    valueFilter,
    setValueFilter,
  };
  return <AdminRegistrationPeriodContext.Provider value={values}>{children}</AdminRegistrationPeriodContext.Provider>;
};

export default AdminRegistrationPeriodProvider;
