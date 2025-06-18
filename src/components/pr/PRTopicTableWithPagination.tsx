import { Fragment, useContext } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import FieldsSelect from '../FieldsSelect';
import { formatCurrencyVND } from '@/lib/utils';
import StatusBadge from '../StatusBadge';
import Tooltip from '../Tooltip';
import { PRTopicManagementContext } from '@/contexts/context/pr/PRTopicManagementContext';
import FallbackNoDataTable from '../FallbackNoDataTable';
import ConfirmDialog from '../ConfirmDialog';
import RenderIf from '../RenderIf';
import PRModalAddOrUpdate from './PRModalAddOrUpdate';
import LoadingTable from '../LoadingTable';
import { useNavigate } from 'react-router-dom';
import { TopicFilterType } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import { toast } from 'sonner';
import { Notice } from '@/enums';

const PRTopicTableWithPagination = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const topics = useContext(PRTopicManagementContext);

  const currentPage = Number(topics?.currentPage);
  const totalPages = topics?.data?.totalPages || 0;

  const currentData = topics?.data?.content || [];

  // Tạo danh sách số trang
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages: (number | string)[] = [];
    let startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('ellipsis');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('ellipsis');
      pages.push(totalPages);
    }

    return pages;
  };

  // Xử lý chuyển trang
  const handlePageChange = (page: number) => {
    if (topics?.setCurrentPage && page >= 1 && page <= totalPages) {
      topics.setCurrentPage(page);

      const queryString = buildSearchParamsWithFilters(page, Number(topics.perPage), topics.valueFilter);

      navigate(`/pr/topic-management?${queryString}`, { replace: true });
    }
  };

  const buildSearchParamsWithFilters = (page: number, size: number, filters: TopicFilterType) => {
    const params = new URLSearchParams();

    params.set('page', String(page));
    params.set('size', String(size));

    if (filters.name) params.set('name', filters.name);
    if (filters.status) params.set('status', filters.status);
    if (filters.maxFee) params.set('maxFee', String(filters.maxFee));
    if (filters.minFee) params.set('minFee', String(filters.minFee));

    return params.toString();
  };

  const changeStatusMutation = useMutation({
    mutationKey: ['change-status'],
    mutationFn: async (id: string) => await httpRequest.get(`/chu-de/doi-trang-thai/${id}`),
    onSuccess: () => {
      toast.success(Notice.UPDATE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['/chu-de/danh-sach-chu-de'] });
    },
    onError: () => {
      toast.error(Notice.UPDATE_FAILED);
    },
  });

  const handleClick = (id: string) => {
    changeStatusMutation.mutate(id);
  };

  return (
    <div className="w-full">
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {topics?.titlesTable.map((title, index) => (
                <TableHead className={`${index === 0 || index === 1 ? 'pl-4' : ''}`} key={index}>
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <RenderIf value={!!topics?.isLoading}>
              <TableRow className="h-[130px]">
                <TableCell colSpan={topics?.titlesTable.length} className="flex my-auto justify-center items-center">
                  <LoadingTable />
                </TableCell>
              </TableRow>
            </RenderIf>
            <RenderIf value={!topics?.isLoading}>
              {Array.isArray(currentData) && currentData.length > 0 ? (
                currentData.map((topic, index) => (
                  <TableRow key={topic.id} className="odd:bg-muted/50">
                    <TableCell className="pl-4">{index + 1}</TableCell>
                    <TableCell className="font-medium">{topic.name}</TableCell>
                    <TableCell>{formatCurrencyVND(topic.royaltyFee)}</TableCell>
                    <TableCell>{topic.description}</TableCell>
                    <TableCell>
                      <StatusBadge status={topic.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-4">
                        {topics?.tooltips.map((item, idx) => (
                          <Fragment key={idx}>
                            <RenderIf value={item.type === 'status_change'}>
                              <ConfirmDialog
                                key={idx}
                                onContinue={() => handleClick(topic.id)}
                                typeTitle={'chuyển đổi trạng thái'}
                                triggerComponent={
                                  <div className="cursor-pointer">
                                    <Tooltip
                                      toolTipContent={item.content}
                                      toolTipTrigger={<item.icon className="size-5 hover:stroke-cyan-500" />}
                                    />
                                  </div>
                                }
                              />
                            </RenderIf>
                            <RenderIf value={item.type === 'update'}>
                              <PRModalAddOrUpdate
                                type="update"
                                idUpdate={topic.id}
                                data={{
                                  name: topic.name,
                                  description: topic.description,
                                  royaltyFee: topic.royaltyFee,
                                  status: topic.status,
                                }}
                                compTrigger={
                                  <div className="cursor-pointer">
                                    <Tooltip
                                      toolTipContent={item.content}
                                      toolTipTrigger={<item.icon className="size-5 hover:stroke-amber-600" />}
                                    />
                                  </div>
                                }
                              />
                            </RenderIf>
                          </Fragment>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={topics?.titlesTable.length} className="text-center">
                    <FallbackNoDataTable />
                  </TableCell>
                </TableRow>
              )}
            </RenderIf>
          </TableBody>
        </Table>
      </div>
      <RenderIf value={!!currentData.length && currentData.length > 0}>
        <div className="flex lg:flex-row flex-col gap-5 mt-4 items-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => handlePageChange(page as number)}
                      isActive={currentPage === page}
                      className={currentPage === page ? '' : 'cursor-pointer'}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div>
            <FieldsSelect
              placeholder="Số bản ghi mỗi trang"
              defaultValue="5"
              label="Số bản ghi mỗi trang"
              data={[
                { label: '5 / trang', value: 5 },
                { label: '10 / trang', value: 10 },
                { label: '50 / trang', value: 50 },
              ]}
              value={topics?.perPage}
              setValue={(val) => {
                if (topics?.setPerPage && topics?.setCurrentPage) {
                  topics.setPerPage(val);
                  topics.setCurrentPage(1);

                  const queryString = buildSearchParamsWithFilters(1, Number(val), topics.valueFilter);

                  navigate(`/pr/topic-management?${queryString}`, {
                    replace: true,
                  });
                }
              }}
            />
          </div>
        </div>
      </RenderIf>
    </div>
  );
};

export default PRTopicTableWithPagination;
