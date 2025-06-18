import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SquarePen } from 'lucide-react';

import { UserRegisterWriteFilterType, UserRegisterWriteResponseType } from '@/types';
import { UserRegisterWriteContext } from '@/contexts/context/user/UserRegisterWriteContext';
import { httpRequest } from '@/utils/httpRequest';
import { useSearchParams } from 'react-router-dom';

const tooltips = [
  {
    content: 'Đăng ký chủ đề',
    icon: SquarePen,
    type: 'update',
    className: 'hover:stroke-yellow-500',
  },
];

const titlesTable = ['#', 'Tên', 'Thời gian', 'Chủ đề đã đăng ký', 'Trạng thái', 'Hành động'];

const UserRegisterWriteProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const sizeFromUrl = Number(searchParams.get('size')) || 5;
  const campaignName = searchParams.get('campaignName') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const status = searchParams.get('status') || '';

  const [data, setData] = useState<UserRegisterWriteResponseType | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState<string>(sizeFromUrl.toString());
  const [valueFilter, setValueFilter] = useState<UserRegisterWriteFilterType>({
    campaignName,
    endDate,
    startDate,
  });

  useEffect(() => {
    setValueFilter({
      campaignName,
      endDate,
      startDate,
    });
    setCurrentPage(pageFromUrl);
    setPerPage(sizeFromUrl.toString());
  }, [
    campaignName,
    endDate,
    pageFromUrl,
    searchParams,
    setCurrentPage,
    setPerPage,
    setValueFilter,
    sizeFromUrl,
    startDate,
    status,
  ]);

  const {
    data: userRegis,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      '/dot-bai-viet/danh-sach-dang-ki-dot-to',
      currentPage,
      perPage,
      endDate,
      startDate,
      campaignName,
      status,
    ],
    queryFn: async () => {
      const params: Record<string, string> = {
        page: currentPage.toString(),
        size: perPage,
      };
      if (campaignName) params.campaignName = campaignName;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (status) params.status = status;

      const response = await httpRequest.get('/dot-bai-viet/danh-sach-dang-ki-dot-to', {
        params,
      });

      return response.data;
    },
  });

  useEffect(() => {
    if (userRegis) {
      setData(userRegis);
    }
  }, [userRegis]);

  const handleClearFields = () => {
    setValueFilter({
      campaignName: '',
      endDate: '',
      startDate: '',
    });
    setSearchParams({ page: '1', size: perPage });
    setCurrentPage(1);
  };

  const handleFilters = () => {
    const query: Record<string, string> = {
      page: '1',
      size: perPage,
    };

    if (valueFilter.campaignName) query.campaignName = valueFilter.campaignName;
    if (valueFilter.endDate) query.endDate = String(valueFilter.endDate);
    if (valueFilter.startDate) query.startDate = String(valueFilter.startDate);

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
  return <UserRegisterWriteContext.Provider value={values}>{children}</UserRegisterWriteContext.Provider>;
};

export default UserRegisterWriteProvider;
