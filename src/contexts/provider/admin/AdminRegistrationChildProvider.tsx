import { ReactNode, useEffect, useState } from 'react';
import { SquarePen } from 'lucide-react';

import { AdminRegistrationChildContext } from '@/contexts/context/admin/AdminRegistrationChildContext';
import { useSearchParams } from 'react-router-dom';

const tooltips = [
  {
    content: 'Phân công giảng viên',
    icon: SquarePen,
    type: 'assign_topic',
    className: 'hover:stroke-yellow-500 size-5',
  },
];

const titlesTable = ['#', 'Tên giảng viên', 'Chủ đề', 'Số lượng bài viết', 'Hành động'];

const AdminRegistrationChildProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const sizeFromUrl = Number(searchParams.get('size')) || 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<string>('5');

  useEffect(() => {
    setCurrentPage(pageFromUrl);
    setPerPage(sizeFromUrl.toString());
  }, [pageFromUrl, sizeFromUrl]);

  const values = {
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
