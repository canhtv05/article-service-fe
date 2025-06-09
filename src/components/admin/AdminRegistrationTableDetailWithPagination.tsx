'use client';

import { Fragment, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
import FallbackNoDataTable from '../FallbackNoDataTable';
import RenderIf from '../RenderIf';
import LoadingTable from '../LoadingTable';
import Tooltip from '../Tooltip';
import { AdminRegistrationDetailContext } from '@/contexts/context/admin/AdminRegistrationDetailContext';
import { formatDateTime } from '@/lib/utils';
import { toast } from 'sonner';

const AdminRegistrationTableDetailWithPagination = () => {
  const navigate = useNavigate();
  const registrationPeriod = useContext(AdminRegistrationDetailContext);

  const currentPage = Number(registrationPeriod?.currentPage);
  const totalPages = registrationPeriod?.dataChild?.totalPages || 0;

  const currentData = registrationPeriod?.dataChild?.content || [];

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

      const queryString = buildSearchParamsWithFilters(page, Number(registrationPeriod.perPage));

      navigate(`/admin/registration-period/detail/${registrationPeriod.dataDetail?.id}?${queryString}`, {
        replace: true,
      });
    }
  };

  const buildSearchParamsWithFilters = (page: number, size: number) => {
    const params = new URLSearchParams();

    params.set('page', String(page));
    params.set('size', String(size));
    return params.toString();
  };

  return (
    <div className="w-full">
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {registrationPeriod?.titlesTable.map((title, index) => (
                <TableHead className={index === 0 || index === 1 ? 'pl-4' : ''} key={index}>
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <RenderIf value={!!registrationPeriod?.isLoading}>
              <TableRow className="h-[130px]">
                <TableCell
                  colSpan={registrationPeriod?.titlesTable.length}
                  className="flex my-auto justify-center items-center"
                >
                  <LoadingTable />
                </TableCell>
              </TableRow>
            </RenderIf>
            <RenderIf value={!registrationPeriod?.isLoading}>
              {Array.isArray(currentData) && currentData.length > 0 ? (
                currentData.map((registration, index) => (
                  <TableRow key={index} className="odd:bg-muted/50">
                    <TableCell className="pl-4">{index + 1}</TableCell>
                    <TableCell className="font-medium">{registration.subCampaignName}</TableCell>
                    <TableCell className="font-medium">
                      {registration.startDate && formatDateTime(registration.startDate, 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell className="font-medium">
                      {registration.endDate && formatDateTime(registration.endDate, 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>{registration.assignedArticleCount}</TableCell>
                    <TableCell>{registration.assignedLecturerCount}</TableCell>
                    <TableCell>
                      <div className="flex gap-4">
                        {registrationPeriod?.tooltips.map((item, idx) => (
                          <Fragment key={idx}>
                            <RenderIf value={item.type === 'assign_topic'}>
                              <RenderIf value={registrationPeriod.dataDetail?.status === 'Inactive'}>
                                <div
                                  className="cursor-pointer"
                                  onClick={() => toast.error('Không thể phân công vì đợt đã ngưng hoạt động')}
                                >
                                  <Tooltip
                                    toolTipContent={item.content}
                                    toolTipTrigger={<item.icon className={item.className} />}
                                  />
                                </div>
                              </RenderIf>
                              <RenderIf value={registrationPeriod.dataDetail?.status !== 'Inactive'}>
                                <Link
                                  to={`/admin/registration-period/child/${registration.subCampaignId}`}
                                  className="cursor-pointer"
                                >
                                  <Tooltip
                                    toolTipContent={item.content}
                                    toolTipTrigger={<item.icon className={item.className} />}
                                  />
                                </Link>
                              </RenderIf>
                            </RenderIf>
                            <RenderIf value={item.type === 'remove'}>
                              <RenderIf value={registrationPeriod.dataDetail?.status === 'Inactive'}>
                                <div
                                  className="cursor-pointer"
                                  onClick={() => toast.error('Không thể xóa vì đợt đã ngưng hoạt động')}
                                >
                                  <Tooltip
                                    toolTipContent={item.content}
                                    toolTipTrigger={<item.icon className={item.className} />}
                                  />
                                </div>
                              </RenderIf>
                              <RenderIf value={registrationPeriod.dataDetail?.status !== 'Inactive'}>
                                <div className="cursor-pointer">
                                  <Tooltip
                                    toolTipContent={item.content}
                                    toolTipTrigger={<item.icon className={item.className} />}
                                  />
                                </div>
                              </RenderIf>
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
              value={registrationPeriod?.perPage}
              setValue={(val) => {
                if (registrationPeriod?.setPerPage && registrationPeriod?.setCurrentPage) {
                  registrationPeriod.setPerPage(val);
                  registrationPeriod.setCurrentPage(1);

                  const queryString = buildSearchParamsWithFilters(1, Number(val));

                  navigate(`/admin/registration-period/detail/${registrationPeriod.dataDetail?.id}?${queryString}`, {
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

export default AdminRegistrationTableDetailWithPagination;
