import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import _ from 'lodash';

import { PRStaffsFilterType, PRStaffsType } from '@/types';
import { PRStaffsContext } from '@/contexts/context/pr/PRStaffsContext';

const titlesTable = ['#', 'Tiêu đề', 'Chủ đề', 'Tác giả', 'Ngày tạo', 'Trạng thái'];

const PRStaffsProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: articles,
    error,
    isLoading,
  } = useQuery<PRStaffsType[]>({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await axios.get('/data_list_articles.json');
      return response.data;
    },
  });

  const [data, setData] = useState<PRStaffsType[] | undefined>(undefined);
  const [valueFilter, setValueFilter] = useState<PRStaffsFilterType>({
    title_and_author_name: '',
    topic_name: '',
  });

  const [perPage, setPerPage] = useState<string>('5');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (articles) {
      setData(articles);
    }
  }, [articles]);

  const handleClearFields = () => {
    setValueFilter({
      title_and_author_name: '',
      topic_name: '',
    });
    if (!articles) return;
    setData(articles);
    setCurrentPage(1);
  };

  const handleFilters = useCallback(() => {
    if (!articles) return;

    const { topic_name, title_and_author_name } = valueFilter;

    if (_.isEmpty(topic_name) && _.isEmpty(title_and_author_name)) {
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

      return true;
    });

    setData(filteredData);
    setCurrentPage(1);
  }, [articles, valueFilter]);

  const values = {
    data,
    error,
    isLoading,
    titlesTable,
    valueFilter,
    setValueFilter,
    setData,
    perPage,
    setPerPage,
    currentPage,
    setCurrentPage,
    handleClearFields,
    handleFilters,
  };

  return <PRStaffsContext.Provider value={values}>{children}</PRStaffsContext.Provider>;
};

export default PRStaffsProvider;
