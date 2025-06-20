import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { StaffListArticleFilterType, StaffListArticleResponseType } from '@/types';
import { CircleX, CloudUpload, Eye } from 'lucide-react';
import { StaffListArticlesContext } from '@/contexts/context/staff/StaffListArticlesContext';
import { useSearchParams } from 'react-router-dom';
import { httpRequest } from '@/utils/httpRequest';

const tooltips = [
  {
    content: 'Xem',
    icon: Eye,
    type: 'view',
    className: 'hover:stroke-yellow-500',
  },
  {
    content: 'Không đăng',
    icon: CircleX,
    type: 'not_publish',
    className: 'hover:stroke-red-500',
  },
  {
    content: 'Đăng bài',
    icon: CloudUpload,
    type: 'publish',
    className: 'hover:stroke-green-500',
  },
];

const titlesTable = ['#', 'Tiêu đề', 'Tác giả', 'Chủ đề', 'Ngày tạo', 'Trạng thái', 'Hành động'];

const StaffListArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const sizeFromUrl = Number(searchParams.get('size')) || 5;
  const titleAndAuthorName = searchParams.get('titleAndAuthorName') || '';
  const status = searchParams.get('status') || '';
  const topicId = searchParams.get('topicId') || '';
  const assignerName = searchParams.get('assignerName') || '';
  const writingCampaignId = searchParams.get('writingCampaignId') || '';

  const [data, setData] = useState<StaffListArticleResponseType | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState<string>(sizeFromUrl.toString());
  const [valueFilter, setValueFilter] = useState<StaffListArticleFilterType>({
    assignerName,
    titleAndAuthorName,
    topicId,
    writingCampaignId,
    status,
  });

  useEffect(() => {
    setValueFilter({
      assignerName,
      titleAndAuthorName,
      topicId,
      writingCampaignId,
      status,
    });
    setCurrentPage(pageFromUrl);
    setPerPage(sizeFromUrl.toString());
  }, [assignerName, pageFromUrl, sizeFromUrl, status, titleAndAuthorName, topicId, writingCampaignId]);

  const {
    data: topicManagement,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      '/admin/bai-viet/danh-sach-bai-viet-phan-cong',
      currentPage,
      perPage,
      status,
      writingCampaignId,
      topicId,
      assignerName,
      titleAndAuthorName,
    ],
    queryFn: async () => {
      const params: Record<string, string> = {
        page: currentPage.toString(),
        size: perPage,
      };
      if (assignerName) params.assignerName = assignerName;
      if (titleAndAuthorName) params.titleAndAuthorName = titleAndAuthorName;
      if (topicId) params.topicId = topicId;
      if (writingCampaignId) params.writingCampaignId = writingCampaignId;
      if (status) params.status = status;

      const response = await httpRequest.get('/admin/bai-viet/danh-sach-bai-viet-phan-cong', {
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
      assignerName: '',
      titleAndAuthorName: '',
      topicId: '',
      writingCampaignId: '',
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

    if (valueFilter.assignerName) query.assignerName = valueFilter.assignerName;
    if (valueFilter.status) query.status = String(valueFilter.status);
    if (valueFilter.titleAndAuthorName) query.titleAndAuthorName = String(valueFilter.titleAndAuthorName);
    if (valueFilter.status) query.status = String(valueFilter.status);
    if (valueFilter.topicId) query.topicId = String(valueFilter.topicId);

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
  return <StaffListArticlesContext.Provider value={values}>{children}</StaffListArticlesContext.Provider>;
};

export default StaffListArticlesProvider;
