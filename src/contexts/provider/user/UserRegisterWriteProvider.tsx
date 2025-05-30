import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { SquarePen } from 'lucide-react';

import { UserRegisterWriteFilterType, UserRegisterWriteType } from '@/types';
import { Status } from '@/enums';
import { UserRegisterWriteContext } from '@/contexts/context/user/UserRegisterWriteContext';

const tooltips = [
  {
    content: 'Đăng ký chủ đề',
    icon: SquarePen,
    type: 'update',
    className: 'hover:stroke-yellow-500',
  },
];

const titlesTable = ['#', 'Mã', 'Tên', 'Thời gian', 'Chủ đề đã đăng ký', 'Trạng thái', 'Hành động'];

const UserRegisterWriteProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: userRegisterWrite,
    isLoading,
    error,
  } = useQuery<UserRegisterWriteType[]>({
    queryKey: ['data_user_register_write'],
    queryFn: async () => {
      const response = await axios.get('/data_user_register_write.json');
      return response.data;
    },
  });

  const [data, setData] = useState<UserRegisterWriteType[] | undefined>(undefined);
  const [valueFilter, setValueFilter] = useState<UserRegisterWriteFilterType>({
    end_date: '',
    name_or_id: '',
    start_date: '',
    status: Status.ALL,
  });

  const [perPage, setPerPage] = useState<string>('5');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (userRegisterWrite) {
      setData(userRegisterWrite);
      setCurrentPage(1);
    }
  }, [userRegisterWrite]);

  const handleClearFields = () => {
    setValueFilter({
      end_date: '',
      name_or_id: '',
      start_date: '',
      status: Status.ALL,
    });
    if (!userRegisterWrite) return;
    setData(userRegisterWrite);
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
  return <UserRegisterWriteContext.Provider value={values}>{children}</UserRegisterWriteContext.Provider>;
};

export default UserRegisterWriteProvider;
