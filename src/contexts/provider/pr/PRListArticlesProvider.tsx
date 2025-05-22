import { ReactNode, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

import { ArticleFilterType, ListArticlesType } from '@/types';
import { PRListArticlesContext } from '@/contexts/context/pr/PRListArticlesContext';
import { StatusSend } from '@/enums';
import { CircleX, CloudUpload, Eye } from 'lucide-react';

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
  const {
    data: articles,
    isLoading,
    error,
  } = useQuery<ListArticlesType[]>({
    queryKey: ['list-articles'],
    queryFn: async () => {
      const response = await axios.get('/data_list_articles.json');
      return response.data;
    },
  });

  const [data, setData] = useState<ListArticlesType[] | undefined>(undefined);
  const [valueFilter, setValueFilter] = useState<ArticleFilterType>({
    title_and_author_name: '',
    assigned_name_and_assigned_id: '',
    topic_name: '',
    status: StatusSend.ALL,
    campaign_period: '',
  });

  const [perPage, setPerPage] = useState<string>('5');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (articles) {
      setData(articles);
      setCurrentPage(1);
    }
  }, [articles]);

  const handleClearFields = () => {
    setValueFilter({
      title_and_author_name: '',
      assigned_name_and_assigned_id: '',
      topic_name: '',
      status: StatusSend.ALL,
      campaign_period: '',
    });
    if (!articles) return;
    setData(articles);
    setCurrentPage(1);
  };

  const handleFilters = useCallback(() => {
    if (!articles) return;

    const { assigned_name_and_assigned_id, campaign_period, status, topic_name, title_and_author_name } = valueFilter;

    if (
      _.isEmpty(topic_name) &&
      status === StatusSend.ALL &&
      _.isEmpty(assigned_name_and_assigned_id) &&
      _.isEmpty(campaign_period) &&
      _.isEmpty(title_and_author_name)
    ) {
      setData(articles);
      setCurrentPage(1);
      return;
    }

    const filteredData = _.filter(articles, (article) => {
      if (!_.isEmpty(topic_name)) {
        if (!_.includes(article.topic_name.toLowerCase(), topic_name.toLowerCase())) {
          return false;
        }
      }

      if (status !== StatusSend.ALL) {
        if (article.status !== status) {
          return false;
        }
      }

      if (!_.isEmpty(campaign_period)) {
        if (!_.isEqual(article.campaign_period.toLowerCase(), campaign_period.toLowerCase())) {
          return false;
        }
      }

      if (!_.isEmpty(title_and_author_name)) {
        if (
          !_.includes(
            article.title.toLowerCase() + ' ' + article.author_name.toLowerCase(),
            title_and_author_name.toLowerCase(),
          )
        ) {
          return false;
        }
      }

      if (!_.isEmpty(assigned_name_and_assigned_id)) {
        const assigneeId = article.assignee_id?.trim().toLowerCase() || '';
        const assigneeName = article.assignee_name?.trim().toLowerCase() || '';
        const target = assigned_name_and_assigned_id.trim().toLowerCase();

        if (!_.includes(`${assigneeId} ${assigneeName}`, target)) {
          return false;
        }
      }

      return true;
    });

    setData(filteredData);
    setCurrentPage(1);
  }, [articles, valueFilter]);

  const values = {
    data,
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
