'use client';

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
import { Checkbox } from '@/components/ui/checkbox';
import FieldsSelect from '../FieldsSelect';
import FallbackNoDataTable from '../FallbackNoDataTable';
import RenderIf from '../RenderIf';
import StatusBadge from '../StatusBadge';
import { AdminRegistrationPeriodFilterType, AdminRegistrationPeriodType } from '@/types';
import { AdminRegistrationPeriodContext } from '@/contexts/context/admin/AdminRegistrationPeriodContext';
import Tooltip from '../Tooltip';
import { Link, useNavigate } from 'react-router-dom';
import { formatDateTime } from '@/lib/utils';
import ConfirmDialog from '../ConfirmDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import { toast } from 'sonner';
import { Notice } from '@/enums';

type AdminRegistrationTableWithPaginationProps = {
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  handleSelectAll: (checked: boolean, currentPageData: AdminRegistrationPeriodType[]) => void;
  handleSelectRow: (id: string, checked: boolean) => void;
  isAllSelected: (currentPageData: AdminRegistrationPeriodType[]) => boolean;
};

const AdminRegistrationTableWithPagination = ({
  selectedRows,
  setSelectedRows,
  handleSelectAll,
  handleSelectRow,
  isAllSelected,
}: AdminRegistrationTableWithPaginationProps) => {
  const navigate = useNavigate();
  const registrationPeriod = useContext(AdminRegistrationPeriodContext);
  const queryClient = useQueryClient();

  const currentPage = Number(registrationPeriod?.currentPage);
  const totalPages = registrationPeriod?.data?.totalPages || 0;

  const currentData = registrationPeriod?.data?.content || [];

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
    if (registrationPeriod?.setCurrentPage && page >= 1 && page <= totalPages) {
      registrationPeriod.setCurrentPage(page);

      const queryString = buildSearchParamsWithFilters(
        page,
        Number(registrationPeriod.perPage),
        registrationPeriod.valueFilter,
      );

      navigate(`/admin/registration-period?${queryString}`, { replace: true });
    }
  };

  const buildSearchParamsWithFilters = (page: number, size: number, filters: AdminRegistrationPeriodFilterType) => {
    const params = new URLSearchParams();

    params.set('page', String(page));
    params.set('size', String(size));

    if (filters.endDate) params.set('.endDate', filters.endDate);
    if (filters.status) params.set('status', filters.status);
    if (filters.startDate) params.set('startDate', filters.startDate);
    if (filters.endDate) params.set('endDate', filters.endDate);

    return params.toString();
  };

  const inactiveCampaignPeriod = useMutation({
    mutationKey: ['inactive-campaign'],
    mutationFn: async (id: string) => await httpRequest.get(`/dot-bai-viet/xoa-dot-dk/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/dot-bai-viet/danh-sanh-dot'] });
      toast.success(Notice.UPDATE_SUCCESS);
    },
    onError: (error) => {
      toast.error(error.message ?? 'Có lỗi xảy ra');
    },
  });

  const handleInactive = (id: string) => {
    inactiveCampaignPeriod.mutate(id);
  };

  return (
    <div className="w-full">
      <div className="text-sm text-muted-foreground mb-2">
        Đã chọn {selectedRows.length} / {registrationPeriod?.data?.totalElements} bài viết
      </div>
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {registrationPeriod?.titlesTable.map((title, index) => (
                <TableHead className={`${index <= 1 ? 'pl-4' : ''} ${index === 0 ? 'w-12' : ''}`} key={index}>
                  {index === 0 ? (
                    <Checkbox
                      checked={isAllSelected(currentData)}
                      onCheckedChange={(checked) => handleSelectAll(!!checked, currentData)}
                      aria-label="Select all"
                      className="border-emerald-500 translate-y-[2px]"
                    />
                  ) : (
                    title
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(currentData) && currentData.length > 0 ? (
              currentData.map((registration) => (
                <TableRow key={registration.id} className="odd:bg-muted/50">
                  <TableCell className="pl-4 w-12">
                    <Checkbox
                      checked={selectedRows.includes(registration.id)}
                      onCheckedChange={(checked) => handleSelectRow(registration.id, !!checked)}
                      aria-label="Select row"
                      className="border-emerald-500 translate-y-[2px]"
                    />
                  </TableCell>
                  <TableCell className="pl-4">{registration.name}</TableCell>
                  <TableCell className="font-medium">{`${formatDateTime(
                    registration.startDate,
                    'dd/MM/yyyy',
                  )} - ${formatDateTime(registration.endDate, 'dd/MM/yyyy')}`}</TableCell>
                  <TableCell>{`${formatDateTime(registration.writingStartDate, 'dd/MM/yyyy')} - ${formatDateTime(
                    registration.writingEndDate,
                    'dd/MM/yyyy',
                  )}`}</TableCell>
                  <TableCell>
                    <StatusBadge status={registration.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      {registrationPeriod?.tooltips.map((item, idx) => (
                        <Fragment key={idx}>
                          <RenderIf value={item.type === 'view'}>
                            <Link
                              to={`/admin/registration-period/detail/${registration.id}`}
                              className="cursor-pointer"
                            >
                              <Tooltip
                                toolTipContent={item.content}
                                toolTipTrigger={<item.icon className={item.className} />}
                              />
                            </Link>
                          </RenderIf>
                          <RenderIf value={item.type === 'assign_topic'}>
                            <div className="cursor-pointer">
                              <Tooltip
                                toolTipContent={item.content}
                                toolTipTrigger={<item.icon className={item.className} />}
                              />
                            </div>
                          </RenderIf>
                          <RenderIf value={item.type === 'remove'}>
                            <ConfirmDialog
                              key={idx}
                              onContinue={() => handleInactive(registration.id)}
                              typeTitle={'chỉnh sửa'}
                              triggerComponent={
                                <div className="cursor-pointer">
                                  <Tooltip
                                    toolTipContent={item.content}
                                    toolTipTrigger={<item.icon className={item.className} />}
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
                <TableCell colSpan={registrationPeriod?.titlesTable.length} className="text-center">
                  <FallbackNoDataTable />
                </TableCell>
              </TableRow>
            )}
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
              value={registrationPeriod?.perPage}
              setValue={(val) => {
                if (registrationPeriod?.setPerPage && registrationPeriod?.setCurrentPage) {
                  registrationPeriod.setPerPage(val);
                  registrationPeriod.setCurrentPage(1);
                  setSelectedRows([]);

                  const queryString = buildSearchParamsWithFilters(1, Number(val), registrationPeriod.valueFilter);

                  navigate(`/admin/registration-period?${queryString}`, {
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

export default AdminRegistrationTableWithPagination;
