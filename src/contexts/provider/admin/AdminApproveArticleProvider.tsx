import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { SquarePen } from 'lucide-react';

import { AdminApproveArticleFilterType, AdminApproveArticleType } from '@/types';
import { AdminApproveArticleContext } from '@/contexts/context/admin/AdminApproveArticleContext';

const tooltips = [
  {
    content: 'Xem chi tiết',
    icon: SquarePen,
    type: 'approve_article',
    className: 'hover:stroke-yellow-500 size-5',
  },
];

const titlesTable = ['#', 'Tiêu đề', 'Tác giả', 'Chủ đề', 'Ngày tạo', 'Trạng thái', 'Đợt viết bài', 'Hành động'];

const AdminApproveArticleProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: approveArticle,
    isLoading,
    error,
  } = useQuery<AdminApproveArticleType[]>({
    queryKey: ['data_approve_article'],
    queryFn: async () => {
      const response = await axios.get('/data_approve_article.json');
      return response.data;
    },
  });

  const [data, setData] = useState<AdminApproveArticleType[] | undefined>(undefined);
  const [perPage, setPerPage] = useState<string>('5');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [valueFilter, setValueFilter] = useState<AdminApproveArticleFilterType>({
    campaign_period: '',
    start_date: '',
    end_date: '',
    topic_name: '',
    topic_name_and_author_name: '',
  });

  useEffect(() => {
    if (approveArticle) {
      setData(approveArticle);
      setCurrentPage(1);
    }
  }, [approveArticle]);

  const handleClearFields = () => {
    setValueFilter({
      campaign_period: '',
      start_date: '',
      end_date: '',
      topic_name: '',
      topic_name_and_author_name: '',
    });
    if (!approveArticle) return;
    setData(approveArticle);
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
    handleClearFields,
    valueFilter,
    setValueFilter,
    handleFilters,
  };
  return <AdminApproveArticleContext.Provider value={values}>{children}</AdminApproveArticleContext.Provider>;
};

export default AdminApproveArticleProvider;
