import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { ArrowLeftRight, SquarePen } from 'lucide-react';
import _ from 'lodash';
import { toast } from 'sonner';

import { PRTopicManagementContext } from '@/contexts/context/pr/PRTopicManagementContext';
import { AddOrUpdateTopicType, TopicFilterType, TopicType } from '@/types';
import { Notice, Status } from '@/enums';

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
  const {
    data: topics,
    error,
    isLoading,
  } = useQuery<TopicType[]>({
    queryKey: ['topics'],
    queryFn: async () => {
      const response = await axios.get('/data_topic.json');
      return response.data;
    },
  });

  const [data, setData] = useState<TopicType[] | undefined>(undefined);
  const [valueFilter, setValueFilter] = useState<TopicFilterType>({
    topic_name: '',
    status: Status.ALL,
    from: undefined,
    to: undefined,
  });

  const [perPage, setPerPage] = useState<string>('5');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataAddOrUpdate, setDataAddOrUpdate] = useState<AddOrUpdateTopicType>({
    title: '',
    royalty: undefined,
    description: '',
  });

  useEffect(() => {
    if (topics) {
      setData(topics);
      setCurrentPage(1);
    }
  }, [topics]);

  const handleClearFields = () => {
    setValueFilter({
      topic_name: '',
      status: Status.ALL,
      from: undefined,
      to: undefined,
    });
    if (!topics) return;
    setData(topics);
    setCurrentPage(1);
  };

  const handleFilters = useCallback(() => {
    if (!data) return;

    const { from, to, topic_name, status } = valueFilter;

    if (_.isEmpty(topic_name) && status === Status.ALL && _.isUndefined(from) && _.isUndefined(to)) {
      setData(data);
      return;
    }

    const filteredData = _.filter(topics, (topic) => {
      if (!_.isEmpty(topic_name)) {
        if (!_.includes(topic.topic_name.toLowerCase(), topic_name.toLowerCase())) {
          return false;
        }
      }

      if (status !== Status.ALL) {
        if (topic.status !== status) {
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
    setCurrentPage(1);
  }, [data, topics, valueFilter]);

  const handleAdd = useCallback(() => {
    const { description, royalty, title } = dataAddOrUpdate;
    const maxMa = data?.length ? Number(data[data.length - 1].ma) : 0;

    const newTopic: TopicType = {
      ma: String(maxMa + 1),
      topic_name: title,
      royalty: royalty ?? 0,
      description,
      status: Status.ACTIVE,
    };

    setData((prev): TopicType[] => [newTopic, ...(prev ?? [])]);

    setDataAddOrUpdate({
      title: '',
      royalty: undefined,
      description: '',
    });

    toast.success(Notice.ADD_SUCCESS);
  }, [data, dataAddOrUpdate]);

  const handleToggleStatus = (ma: string) => {
    setData((prevData) => {
      if (!prevData) return prevData;
      const updated = prevData.map((topic) => {
        if (topic.ma === ma) {
          return {
            ...topic,
            status: topic.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE,
          };
        }
        return topic;
      });
      return updated;
    });

    toast.success(Notice.UPDATE_SUCCESS);
  };

  const handleUpdate = (ma: string, updatedTopic: AddOrUpdateTopicType) => {
    setData((prevData) => {
      if (!prevData) return prevData;
      const updated = prevData.map((topic) => {
        if (topic.ma === ma) {
          return {
            ...topic,
            topic_name: updatedTopic.title,
            royalty: updatedTopic.royalty ?? topic.royalty,
            description: updatedTopic.description,
          };
        }
        return topic;
      });
      return updated;
    });
    toast.success(Notice.UPDATE_SUCCESS);
  };

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
    currentPage,
    setCurrentPage,
    handleClearFields,
    handleFilters,
    dataAddOrUpdate,
    setDataAddOrUpdate,
    handleAdd,
    handleToggleStatus,
    handleUpdate,
  };

  return <PRTopicManagementContext.Provider value={values}>{children}</PRTopicManagementContext.Provider>;
};

export default PRTopicManagementProvider;
