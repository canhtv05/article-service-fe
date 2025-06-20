import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Eye } from 'lucide-react';

import { UserListArticlesFilterType, UserListArticlesResponseType } from '@/types';
import { UserListArticlesContext } from '@/contexts/context/user/UserListArticlesContext';
import { useSearchParams } from 'react-router-dom';
import { httpRequest } from '@/utils/httpRequest';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const sizeFromUrl = Number(searchParams.get('size')) || 5;
  const title = searchParams.get('title') || '';
  const status = searchParams.get('status') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const topicName = searchParams.get('topicName') || '';
  const campaignId = searchParams.get('campaignId') || '';

  const [data, setData] = useState<UserListArticlesResponseType | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState<string>(sizeFromUrl.toString());
  const [valueFilter, setValueFilter] = useState<UserListArticlesFilterType>({
    campaignId,
    endDate,
    startDate,
    title,
    topicName,
    status,
  });

  useEffect(() => {
    setValueFilter({
      campaignId,
      endDate,
      startDate,
      title,
      topicName,
      status,
    });
    setCurrentPage(pageFromUrl);
    setPerPage(sizeFromUrl.toString());
  }, [
    campaignId,
    endDate,
    pageFromUrl,
    searchParams,
    setCurrentPage,
    setPerPage,
    setValueFilter,
    sizeFromUrl,
    startDate,
    status,
    title,
    topicName,
  ]);

  const {
    data: topicManagement,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      '/admin/bai-viet/ds-bai-viet-cua-toi',
      currentPage,
      perPage,
      startDate,
      endDate,
      title,
      topicName,
      campaignId,
      status,
    ],
    queryFn: async () => {
      const params: Record<string, string> = {
        page: currentPage.toString(),
        size: perPage,
      };
      if (topicName) params.topicName = topicName;
      if (campaignId) params.campaignId = campaignId;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      if (status) params.status = status;
      if (title) params.title = title;

      const response = await httpRequest.get('/admin/bai-viet/ds-bai-viet-cua-toi', {
        params,
      });

      return response.data;
    },
  });

  useEffect(() => {
    if (topicManagement) {
      setData(topicManagement);
    }
  }, [topicManagement]);

  const handleClearFields = () => {
    setValueFilter({
      campaignId: '',
      endDate: '',
      startDate: '',
      title: '',
      topicName: '',
      status: '',
    });
    setSearchParams({ page: '1', size: perPage });
    setCurrentPage(1);
  };

  const handleFilters = () => {
    const query: Record<string, string> = {
      page: '1',
      size: perPage,
    };

    if (valueFilter.campaignId) query.campaignId = valueFilter.campaignId;
    if (valueFilter.endDate) query.endDate = String(valueFilter.endDate);
    if (valueFilter.startDate) query.startDate = String(valueFilter.startDate);
    if (valueFilter.status) query.status = String(valueFilter.status);
    if (valueFilter.title) query.title = String(valueFilter.title);
    if (valueFilter.topicName) query.topicName = String(valueFilter.topicName);

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
  return <UserListArticlesContext.Provider value={values}>{children}</UserListArticlesContext.Provider>;
};

export default UserListArticlesProvider;
