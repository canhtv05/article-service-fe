import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';

import { PRStaffsFilterType, PRStaffsType } from '@/types';
import { PRStaffsContext } from '@/contexts/context/pr/PRStaffsContext';
import { httpRequest } from '@/utils/httpRequest';
import { useSearchParams } from 'react-router-dom';

const titlesTable = ['', '#', 'Tiêu đề', 'Chủ đề', 'Tác giả', 'Ngày tạo', 'Trạng thái'];

const PRStaffsProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const titleAndAuthorName = searchParams.get('titleAndAuthorName') || '';
  const topicId = searchParams.get('topicId') || '';

  const [data, setData] = useState<PRStaffsType[] | undefined>(undefined);
  const [valueFilter, setValueFilter] = useState<PRStaffsFilterType>({
    titleAndAuthorName: '',
    topicId: '',
  });

  const {
    data: staffsPR,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['/chu-de/bai-viet-cho-phan-cong', titleAndAuthorName, topicId],
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (titleAndAuthorName) params.titleAndAuthorName = titleAndAuthorName;
      if (topicId) params.topicId = topicId;

      const response = await httpRequest.get('/chu-de/bai-viet-cho-phan-cong', {
        params,
      });

      return response.data;
    },
  });

  useEffect(() => {
    if (staffsPR) {
      setData(staffsPR);
    }
  }, [staffsPR]);

  const handleClearFields = () => {
    setValueFilter({
      titleAndAuthorName: '',
      topicId: '',
    });

    setSearchParams({});
  };

  const handleFilters = () => {
    const query: Record<string, string> = {};

    if (valueFilter.titleAndAuthorName) query.titleAndAuthorName = valueFilter.titleAndAuthorName;
    if (valueFilter.topicId) query.topicId = valueFilter.topicId;

    setSearchParams(query);
  };

  const values = {
    data,
    setData,
    isLoading,
    error,
    titlesTable,
    handleFilters,
    handleClearFields,
    valueFilter,
    setValueFilter,
  };

  return <PRStaffsContext.Provider value={values}>{children}</PRStaffsContext.Provider>;
};

export default PRStaffsProvider;
