import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { ArrowLeftRight, SquarePen } from 'lucide-react';

import { PRTopicManagementContext } from '@/contexts/context/pr/PRTopicManagementContext';
import { TopicFilterType, TopicResponseType } from '@/types';
import { useSearchParams } from 'react-router-dom';
import { httpRequest } from '@/utils/httpRequest';

const tooltips = [
  {
    content: 'Chỉnh sửa',
    icon: SquarePen,
    type: 'update',
  },
  {
    content: 'Chuyển đổi trạng thái',
    icon: ArrowLeftRight,
    type: 'status_change',
  },
];

const titlesTable = ['#', 'Mã', 'Tên chủ đề', 'Nhuận bút', 'Mô tả', 'Trạng thái', 'Hành động'];

const PRTopicManagementProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const sizeFromUrl = Number(searchParams.get('size')) || 5;
  const name = searchParams.get('name') || '';
  const status = searchParams.get('status') || '';
  const minFee = searchParams.get('minFee') || '';
  const maxFee = searchParams.get('maxFee') || '';

  const [data, setData] = useState<TopicResponseType | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState<string>(sizeFromUrl.toString());
  const [valueFilter, setValueFilter] = useState<TopicFilterType>({
    maxFee: Number(maxFee),
    minFee: Number(minFee),
    name,
    status,
  });

  useEffect(() => {
    setValueFilter({
      maxFee: Number(maxFee),
      minFee: Number(minFee),
      name,
      status,
    });
    setCurrentPage(pageFromUrl);
    setPerPage(sizeFromUrl.toString());
  }, [
    maxFee,
    minFee,
    name,
    pageFromUrl,
    searchParams,
    setCurrentPage,
    setPerPage,
    setValueFilter,
    sizeFromUrl,
    status,
  ]);

  const {
    data: topicManagement,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['/chu-de/danh-sach-chu-de', currentPage, perPage, name, maxFee, minFee, status],
    queryFn: async () => {
      const params: Record<string, string> = {
        page: currentPage.toString(),
        size: perPage,
      };
      if (name) params.name = name;
      if (minFee) params.minFee = minFee;
      if (maxFee) params.maxFee = maxFee;
      if (status) params.status = status;

      const response = await httpRequest.get('/chu-de/danh-sach-chu-de', {
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
      maxFee: undefined,
      minFee: undefined,
      status: '',
      name: '',
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
    if (valueFilter.maxFee) query.maxFee = String(valueFilter.maxFee);
    if (valueFilter.minFee) query.minFee = String(valueFilter.minFee);

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

  return <PRTopicManagementContext.Provider value={values}>{children}</PRTopicManagementContext.Provider>;
};

export default PRTopicManagementProvider;
