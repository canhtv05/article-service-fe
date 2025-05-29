import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { AdminArchiveFilterType, AdminArchiveType } from '@/types';
import { Download, Eye, Clipboard } from 'lucide-react';
import { AdminArchiveContext } from '@/contexts/context/admin/AdminArchiveContext';

const tooltips = [
  {
    content: 'Copy đường dẫn driver',
    icon: Clipboard,
    type: 'copy',
    className: 'hover:stroke-yellow-500 size-5',
  },
  {
    content: 'Xem',
    icon: Eye,
    type: 'view',
    className: 'hover:stroke-green-500 size-5',
  },
  {
    content: 'Tải bài viết',
    icon: Download,
    type: 'download',
    className: 'hover:stroke-red-500 size-5',
  },
];

const titlesTable = ['', '#', 'Mã', 'Tên', 'Thời gian', 'Thời gian đăng ký', 'Đợt viết bài', 'Trạng thái', 'Hành động'];

const AdminArchiveProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: registrationPeriod,
    isLoading,
    error,
  } = useQuery<AdminArchiveType[]>({
    queryKey: ['data_admin_archive'],
    queryFn: async () => {
      const response = await axios.get('/data_admin_archive.json');
      return response.data;
    },
  });

  const [data, setData] = useState<AdminArchiveType[] | undefined>(undefined);
  const [valueFilter, setValueFilter] = useState<AdminArchiveFilterType>({
    author_name: '',
    campaign_period: '',
    id_author: '',
    title: '',
    topic: '',
  });

  const [perPage, setPerPage] = useState<string>('5');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (registrationPeriod) {
      setData(registrationPeriod);
      setCurrentPage(1);
    }
  }, [registrationPeriod]);

  const handleClearFields = () => {
    setValueFilter({
      author_name: '',
      campaign_period: '',
      id_author: '',
      title: '',
      topic: '',
    });
    if (!registrationPeriod) return;
    setData(registrationPeriod);
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
    handleFilters,
    handleClearFields,
    valueFilter,
    setValueFilter,
  };
  return <AdminArchiveContext.Provider value={values}>{children}</AdminArchiveContext.Provider>;
};

export default AdminArchiveProvider;
