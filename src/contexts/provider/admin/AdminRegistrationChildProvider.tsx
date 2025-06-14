import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { SquarePen, Trash } from 'lucide-react';

import { AdminRegistrationChildType } from '@/types';
import { AdminRegistrationChildContext } from '@/contexts/context/admin/AdminRegistrationChildContext';
import { useParams, useSearchParams } from 'react-router-dom';

const tooltips = [
  {
    content: 'Phân công giảng viên',
    icon: SquarePen,
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

const titlesTable = ['#', 'Mã giảng viên', 'Tên giảng viên', 'Chủ đề', 'Số lượng bài viết', 'Hành động'];

const AdminRegistrationChildProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const sizeFromUrl = Number(searchParams.get('size')) || 5;
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<string>('5');

  useEffect(() => {
    setCurrentPage(pageFromUrl);
    setPerPage(sizeFromUrl.toString());
  }, [pageFromUrl, sizeFromUrl]);

  const {
    data: registrationPeriodChild,
    isLoading,
    error,
  } = useQuery<AdminRegistrationChildType[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('/data_users.json');
      return response.data;
    },
  });

  const [data, setData] = useState<AdminRegistrationChildType[] | undefined>(undefined);

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
  };
  return <AdminRegistrationChildContext.Provider value={values}>{children}</AdminRegistrationChildContext.Provider>;
};

export default AdminRegistrationChildProvider;
