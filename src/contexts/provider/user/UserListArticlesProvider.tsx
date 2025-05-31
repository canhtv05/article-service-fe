import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Eye } from 'lucide-react';

import { UserListArticlesFilterType, UserListArticlesType } from '@/types';
import { UserListArticlesContext } from '@/contexts/context/user/UserListArticlesContext';

const tooltips = [
  {
    content: 'Xem',
    icon: Eye,
    type: 'view',
    className: 'hover:stroke-green-500',
  },
];

const titlesTable = ['#', 'Tiêu đề', 'Chủ đề', 'Ngày tạo', 'Đợt', 'Trạng thái', 'Hành động'];

const UserListArticlesProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: userRegisterWrite,
    isLoading,
    error,
  } = useQuery<UserListArticlesType[]>({
    queryKey: ['data_user_list_articles'],
    queryFn: async () => {
      const response = await axios.get('/data_user_list_articles.json');
      return response.data;
    },
  });

  const [data, setData] = useState<UserListArticlesType[] | undefined>(undefined);
  const [valueFilter, setValueFilter] = useState<UserListArticlesFilterType>({
    end_date: '',
    campaign_period: '',
    title: '',
    topic: '',
    start_date: '',
    status: '',
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
      campaign_period: '',
      title: '',
      topic: '',
      start_date: '',
      status: '',
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
  return <UserListArticlesContext.Provider value={values}>{children}</UserListArticlesContext.Provider>;
};

export default UserListArticlesProvider;
