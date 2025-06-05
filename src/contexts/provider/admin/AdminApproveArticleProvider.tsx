import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { SquarePen } from 'lucide-react';

import { AdminApproveArticleFilterType, AdminApproveArticleResponseType } from '@/types';
import { AdminApproveArticleContext } from '@/contexts/context/admin/AdminApproveArticleContext';
import { httpRequest } from '@/utils/httpRequest';

const tooltips = [
  {
    content: 'Xem chi tiết',
    icon: SquarePen,
    type: 'approve_article',
    className: 'hover:stroke-yellow-500 size-5',
  },
];

const titlesTable = [
  '#',
  'Tiêu đề',
  'Tác giả',
  'Chủ đề',
  'Tên đợt viết bài',
  'Ngày tạo',
  'Trạng thái',
  'Đợt viết bài',
  'Hành động',
];

const AdminApproveArticleProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const sizeFromUrl = Number(searchParams.get('size')) || 5;

  const titleAndAuthorName = searchParams.get('titleAndAuthorName') || '';
  const campaignName = searchParams.get('campaignName') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  const [data, setData] = useState<AdminApproveArticleResponseType | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState<string>(sizeFromUrl.toString());
  const [valueFilter, setValueFilter] = useState<AdminApproveArticleFilterType>({
    titleAndAuthorName: '',
    endData: '',
    startDate: '',
    campaignName: '',
  });

  useEffect(() => {
    setValueFilter({
      titleAndAuthorName,
      campaignName,
      startDate,
      endData: endDate,
    });
    setCurrentPage(pageFromUrl);
    setPerPage(sizeFromUrl.toString());
  }, [campaignName, endDate, pageFromUrl, searchParams, sizeFromUrl, startDate, titleAndAuthorName]);

  const {
    data: approveArticle,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      '/admin/bai-viet/bai-viet-cho-phe-duyet',
      currentPage,
      perPage,
      titleAndAuthorName,
      campaignName,
      startDate,
      endDate,
    ],
    queryFn: async () => {
      const response = await httpRequest.get('/admin/bai-viet/bai-viet-cho-phe-duyet', {
        params: {
          page: currentPage,
          size: perPage,
          titleAndAuthorName,
          campaignName,
          startDate,
          endDate,
        },
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (approveArticle) {
      setData(approveArticle);
    }
  }, [approveArticle]);

  const handleClearFields = () => {
    setValueFilter({
      titleAndAuthorName: '',
      endData: '',
      startDate: '',
      campaignName: '',
    });

    setSearchParams({ page: '1', size: perPage.toString() });
  };

  const handleFilters = () => {
    const query: Record<string, string> = {
      page: '1',
      size: perPage.toString(),
    };

    if (valueFilter.titleAndAuthorName) query.titleAndAuthorName = valueFilter.titleAndAuthorName;
    if (valueFilter.campaignName) query.campaignName = valueFilter.campaignName;
    if (valueFilter.startDate) query.startDate = valueFilter.startDate;
    if (valueFilter.endData) query.endDate = valueFilter.endData;

    setSearchParams(query);
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
    handleClearFields,
    valueFilter,
    setValueFilter,
    handleFilters,
  };

  return <AdminApproveArticleContext.Provider value={values}>{children}</AdminApproveArticleContext.Provider>;
};

export default AdminApproveArticleProvider;
