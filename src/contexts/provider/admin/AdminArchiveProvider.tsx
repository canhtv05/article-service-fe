import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Eye } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { AdminArchiveFilterType, AdminArchiveResponseType } from '@/types';
import { AdminArchiveContext } from '@/contexts/context/admin/AdminArchiveContext';
import { httpRequest } from '@/utils/httpRequest';

const tooltips = [
  {
    content: 'Xem',
    icon: Eye,
    type: 'view',
    className: 'hover:stroke-green-500 size-5',
  },
];

const titlesTable = [
  '',
  '#',
  'Tiêu đề bài viết',
  'Chủ đề',
  'Giảng viên',
  'Trạng thái',
  'Nhuận bút',
  'Tên đợt viết bài',
  'Ngày phê duyệt',
  'Hành động',
];

const AdminArchiveProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const sizeFromUrl = Number(searchParams.get('size')) || 5;
  const title = searchParams.get('title') || '';
  const authorName = searchParams.get('authorName') || '';
  const campaignName = searchParams.get('campaignName') || '';
  const status = searchParams.get('status') || '';

  const [data, setData] = useState<AdminArchiveResponseType | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState<string>(sizeFromUrl.toString());
  const [valueFilter, setValueFilter] = useState<AdminArchiveFilterType>({
    title,
    authorName,
    campaignName,
    status,
  });

  useEffect(() => {
    setValueFilter({
      title,
      authorName,
      campaignName,
      status,
    });
    setCurrentPage(pageFromUrl);
    setPerPage(sizeFromUrl.toString());
  }, [authorName, campaignName, pageFromUrl, searchParams, sizeFromUrl, status, title]);

  const {
    data: approveArticle,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['/admin/bai-viet/danh-sach-bai-viet', currentPage, perPage, title, authorName, campaignName, status],
    queryFn: async () => {
      const params: Record<string, string> = {
        page: currentPage.toString(),
        size: perPage,
      };
      if (title) params.title = title;
      if (authorName) params.authorName = authorName;
      if (campaignName) params.campaignName = campaignName;
      if (status) params.status = status;

      const response = await httpRequest.get('/admin/bai-viet/danh-sach-bai-viet', {
        params,
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
      title: '',
      authorName: '',
      status: '',
      campaignName: '',
    });
    setSearchParams({ page: '1', size: perPage });
    setCurrentPage(1);
  };

  const handleFilters = () => {
    const query: Record<string, string> = {
      page: '1',
      size: perPage,
    };

    if (valueFilter.title) query.title = valueFilter.title;
    if (valueFilter.campaignName) query.campaignName = valueFilter.campaignName;
    if (valueFilter.authorName) query.authorName = valueFilter.authorName;

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
  return <AdminArchiveContext.Provider value={values}>{children}</AdminArchiveContext.Provider>;
};

export default AdminArchiveProvider;
