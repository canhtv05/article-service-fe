import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ArticleFilterType, ListArticlesResponseType } from '@/types';
import { PRListArticlesContext } from '@/contexts/context/pr/PRListArticlesContext';
import { CircleX, CloudUpload, Eye } from 'lucide-react';
import { httpRequest } from '@/utils/httpRequest';
import { useSearchParams } from 'react-router-dom';

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

const titlesTable = [
  '#',
  'Tiêu đề',
  'Tác giả',
  'Chủ đề',
  'Ngày tạo',
  'Đợt viết bài',
  'Trạng thái',
  'Phân công',
  'Hành động',
];

const PRListArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const sizeFromUrl = Number(searchParams.get('size')) || 5;
  const status = searchParams.get('status') || '';
  const titleAndAuthorName = searchParams.get('titleAndAuthorName') || '';
  const writingCampaignId = searchParams.get('writingCampaignId') || '';
  const topicId = searchParams.get('topicId') || '';
  const assignerName = searchParams.get('assignerName') || '';

  const [data, setData] = useState<ListArticlesResponseType | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [perPage, setPerPage] = useState<string>(sizeFromUrl.toString());
  const [valueFilter, setValueFilter] = useState<ArticleFilterType>({
    assignerName,
    status,
    titleAndAuthorName,
    topicId,
    writingCampaignId,
  });

  useEffect(() => {
    setValueFilter({
      assignerName,
      status,
      titleAndAuthorName,
      topicId,
      writingCampaignId,
    });
    setCurrentPage(pageFromUrl);
    setPerPage(sizeFromUrl.toString());
  }, [assignerName, pageFromUrl, sizeFromUrl, status, titleAndAuthorName, topicId, writingCampaignId]);

  const {
    data: listArticles,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      '/chu-de/danh-sach-bai-viet-PR',
      currentPage,
      perPage,
      titleAndAuthorName,
      topicId,
      writingCampaignId,
      assignerName,
      status,
    ],
    queryFn: async () => {
      const params: Record<string, string> = {
        page: currentPage.toString(),
        size: perPage,
      };
      if (titleAndAuthorName) params.titleAndAuthorName = titleAndAuthorName;
      if (writingCampaignId) params.writingCampaignId = writingCampaignId;
      if (topicId) params.topicId = topicId;
      if (status) params.status = status;
      if (assignerName) params.assignerName = assignerName;

      const response = await httpRequest.get('/chu-de/danh-sach-bai-viet-PR', {
        params,
      });

      return response.data;
    },
  });

  useEffect(() => {
    if (listArticles) {
      setData(listArticles);
    }
  }, [listArticles]);

  const handleClearFields = () => {
    setValueFilter({
      assignerName: '',
      status: '',
      titleAndAuthorName: '',
      topicId: '',
      writingCampaignId: '',
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
    if (valueFilter.titleAndAuthorName) query.titleAndAuthorName = String(valueFilter.titleAndAuthorName);
    if (valueFilter.topicId) query.topicId = String(valueFilter.topicId);
    if (valueFilter.status) query.status = String(valueFilter.status);
    if (valueFilter.writingCampaignId) query.writingCampaignId = String(valueFilter.writingCampaignId);

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
  return <PRListArticlesContext.Provider value={values}>{children}</PRListArticlesContext.Provider>;
};

export default PRListArticlesProvider;
