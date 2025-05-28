import { ReactNode, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

import { AdminRegistrationPeriodFilterType, AdminRegistrationPeriodType } from '@/types';
import { Status, StatusSend } from '@/enums';
import { Eye, Pen, Trash } from 'lucide-react';
import { AdminRegistrationPeriodContext } from '@/contexts/context/admin/AdminRegistrationPeriodContext';

const tooltips = [
  {
    content: 'Xem',
    icon: Eye,
    type: 'view',
    className: 'hover:stroke-green-500 size-5',
  },
  {
    content: 'Phân công chủ đề',
    icon: Pen,
    type: 'assign_topic',
    className: 'hover:stroke-yellow-500 size-5',
  },
  {
    content: 'Xóa',
    icon: Trash,
    type: 'remove',
    className: 'hover:stroke-red-500 size-5',
  },
];

const titlesTable = ['#', 'Mã', 'Tên', 'Thời gian', 'Thời gian đăng ký', 'Đợt viết bài', 'Trạng thái', 'Hành động'];

const AdminRegistrationPeriodProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: registrationPeriod,
    isLoading,
    error,
  } = useQuery<AdminRegistrationPeriodType[]>({
    queryKey: ['list-registration-period'],
    queryFn: async () => {
      const response = await axios.get('/data_registration_period.json');
      return response.data;
    },
  });

  const [data, setData] = useState<AdminRegistrationPeriodType[] | undefined>(undefined);
  const [valueFilter, setValueFilter] = useState<AdminRegistrationPeriodFilterType>({
    status: Status.ALL,
    id_or_name: '',
    end_date: '',
    start_date: '',
  });

  const [perPage, setPerPage] = useState<string>('5');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (registrationPeriod) {
      setData(registrationPeriod);
      setCurrentPage(1);
    }
  }, [registrationPeriod]);

  const handleClearFields = () => {
    setValueFilter({
      status: Status.ALL,
      id_or_name: '',
      end_date: '',
      start_date: '',
    });
    if (!registrationPeriod) return;
    setData(registrationPeriod);
    setCurrentPage(1);
  };

  const handleFilters = useCallback(() => {
    if (!registrationPeriod) return;

    const { status, end_date, id_or_name, start_date } = valueFilter;

    if (_.isEmpty(end_date) && status === StatusSend.ALL && _.isEmpty(id_or_name) && _.isEmpty(start_date)) {
      setData(registrationPeriod);
      setCurrentPage(1);
      return;
    }

    const filteredData = _.filter(registrationPeriod, (article) => {
      if (!_.isEmpty(id_or_name)) {
        if (!_.includes(article.id.toLowerCase() + ' ' + article.name.toLowerCase(), id_or_name.toLowerCase())) {
          return false;
        }
      }

      if (status !== StatusSend.ALL) {
        if (article.status !== status) {
          return false;
        }
      }

      // if (!_.isEmpty(start_date)) {
      //   if (!_.isEqual(article.campaign_period.toLowerCase(), campaign_period.toLowerCase())) {
      //     return false;
      //   }
      // }

      //chua loc start date and end date

      return true;
    });

    setData(filteredData);
    setCurrentPage(1);
  }, [registrationPeriod, valueFilter]);

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
  return <AdminRegistrationPeriodContext.Provider value={values}>{children}</AdminRegistrationPeriodContext.Provider>;
};

export default AdminRegistrationPeriodProvider;
