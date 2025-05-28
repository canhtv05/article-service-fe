import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { SquarePen, Trash } from 'lucide-react';

import { AdminRegistrationDetailType } from '@/types';
import { AdminRegistrationDetailContext } from '@/contexts/context/admin/AdminRegistrationDetailContext';

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

const titlesTable = [
  '#',
  'Tên đợt',
  'Thời gian bắt đầu',
  'Thời gian kết thúc',
  'Số bài đã phân',
  'Số người phân công',
  'Hành động',
];

const AdminRegistrationDetailProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: registrationPeriod,
    isLoading,
    error,
  } = useQuery<AdminRegistrationDetailType[]>({
    queryKey: ['list-registration-period'],
    queryFn: async () => {
      const response = await axios.get('/data_registration_period.json');
      return response.data;
    },
  });

  const [data, setData] = useState<AdminRegistrationDetailType[] | undefined>(undefined);
  const [perPage, setPerPage] = useState<string>('5');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (registrationPeriod) {
      setData(registrationPeriod);
      setCurrentPage(1);
    }
  }, [registrationPeriod]);

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
  return <AdminRegistrationDetailContext.Provider value={values}>{children}</AdminRegistrationDetailContext.Provider>;
};

export default AdminRegistrationDetailProvider;
