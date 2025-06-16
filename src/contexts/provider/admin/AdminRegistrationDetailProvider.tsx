import { ReactNode, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SquarePen } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router-dom';

import { AdminRegistrationDetailType, AdminRegistrationDetailChildTResponseType } from '@/types';
import { AdminRegistrationDetailContext } from '@/contexts/context/admin/AdminRegistrationDetailContext';
import { httpRequest } from '@/utils/httpRequest';

const tooltips = [
  {
    content: 'Phân công giảng viên',
    icon: SquarePen,
    type: 'assign_topic',
    className: 'hover:stroke-yellow-500 size-5',
  },
];

const titlesTable = [
  '#',
  'Tên đợt',
  'Thời gian bắt đầu',
  'Thời gian kết thúc',
  'Số bài đã phân',
  'Số người phân công',
  'Hành động',
];

const AdminRegistrationDetailProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const sizeFromUrl = Number(searchParams.get('size')) || 5;
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<string>('5');

  useEffect(() => {
    setCurrentPage(pageFromUrl);
    setPerPage(sizeFromUrl.toString());
  }, [pageFromUrl, sizeFromUrl]);

  const {
    data: dataDetail,
    isLoading: isLoadingDetail,
    error: errorDetail,
  } = useQuery<AdminRegistrationDetailType>({
    queryKey: ['registration-detail', id],
    queryFn: async () => {
      const res = await httpRequest.get(`/dot-bai-viet/chi-tiet/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const {
    data: dataChild,
    isLoading: isLoadingChild,
    error: errorChild,
  } = useQuery<AdminRegistrationDetailChildTResponseType>({
    queryKey: ['registration-child', id, perPage, currentPage],
    queryFn: async () => {
      const params: Record<string, string> = {
        page: currentPage.toString(),
        size: perPage,
      };
      const res = await httpRequest.get(`/dot-bai-viet/danh-sach-dot-con/${id}`, {
        params,
      });
      return res.data;
    },
    enabled: !!id,
  });

  const values = {
    dataDetail,
    setDataDetail: () => {},
    dataChild,
    setDataChild: () => {},
    isLoading: isLoadingDetail || isLoadingChild,
    error: errorDetail ?? errorChild,
    titlesTable,
    tooltips,
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
  };

  return <AdminRegistrationDetailContext.Provider value={values}>{children}</AdminRegistrationDetailContext.Provider>;
};

export default AdminRegistrationDetailProvider;
