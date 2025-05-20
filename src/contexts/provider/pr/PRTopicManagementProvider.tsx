import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { ArrowLeftRight, SquarePen } from 'lucide-react';
import _ from 'lodash';
import { toast } from 'sonner';

import { PRTopicManagementContext } from '@/contexts/context/pr/PRTopicManagementContext';
import { AddTopicType, TopicFilterType, TopicType } from '@/types';
import { Status } from '@/enums';

const tooltips = [
  {
    content: 'Chỉnh sửa',
    icon: SquarePen,
  },
  {
    content: 'Chuyển đổi trạng thái',
    icon: ArrowLeftRight,
  },
];

const titlesTable = ['#', 'Mã', 'Tên chủ đề', 'Nhuận bút', 'Mô tả', 'Trạng thái', 'Hành động'];

const PRTopicManagementProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: topics,
    error,
    isLoading,
  } = useQuery<TopicType[]>({
    queryKey: ['topics'],
    queryFn: async () => {
      const response = await axios.get('/data.json');
      return response.data;
    },
  });

  const [data, setData] = useState<TopicType[] | undefined>(undefined);
  const [valueFilter, setValueFilter] = useState<TopicFilterType>({
    topic_name: '',
    valueSelect: Status.ALL,
    from: undefined,
    to: undefined,
  });

  const [perPage, setPerPage] = useState<string>('');
  const [dataAdd, setDataAdd] = useState<AddTopicType>({
    title: '',
    royalty: undefined,
    description: '',
  });

  useEffect(() => {
    if (topics) {
      setData(topics);
    }
  }, [topics]);

  const handleClearFields = () => {
    setValueFilter({
      topic_name: '',
      valueSelect: Status.ALL,
      from: undefined,
      to: undefined,
    });
    if (!topics) return;
    setData(topics);
  };

  const handleFilters = useCallback(() => {
    if (!topics) return;

    const { from, to, topic_name, valueSelect } = valueFilter;

    if (_.isEmpty(topic_name) && valueSelect === Status.ALL && _.isUndefined(from) && _.isUndefined(to)) {
      setData(topics);
      return;
    }

    const filteredData = _.filter(topics, (topic) => {
      if (!_.isEmpty(topic_name)) {
        if (!_.includes(topic.topic_name.toLowerCase(), topic_name.toLowerCase())) {
          return false;
        }
      }

      if (valueSelect !== Status.ALL) {
        if (topic.status !== valueSelect) {
          return false;
        }
      }

      if (!_.isUndefined(from)) {
        if (topic.royalty < from) {
          return false;
        }
      }

      if (!_.isUndefined(to)) {
        if (topic.royalty > to) {
          return false;
        }
      }

      return true;
    });

    setData(filteredData);
  }, [topics, valueFilter]);

  const handleAdd = useCallback(() => {
    const { description, royalty, title } = dataAdd;
    if (_.isEmpty(description) || _.isUndefined(royalty) || _.isEmpty(title)) {
      toast.error('Vui lòng nhập đủ trường.');
      return;
    }

    const maxMa = data?.length ? Number(data[data.length - 1].ma) : 0;

    const newTopic: TopicType = {
      ma: String(maxMa + 1),
      topic_name: title,
      royalty: royalty ?? 0,
      description,
      status: Status.ACTIVE,
    };

    setData((prev): TopicType[] => [newTopic, ...(prev ?? [])]);

    setDataAdd({
      title: '',
      royalty: undefined,
      description: '',
    });
  }, [data, dataAdd]);

  const values = {
    data,
    error,
    isLoading,
    titlesTable,
    tooltips,
    valueFilter,
    setValueFilter,
    perPage,
    setPerPage,
    handleClearFields,
    handleFilters,
    dataAdd,
    setDataAdd,
    handleAdd,
  };

  return <PRTopicManagementContext.Provider value={values}>{children}</PRTopicManagementContext.Provider>;
};

export default PRTopicManagementProvider;
