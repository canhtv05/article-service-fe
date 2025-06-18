import { Fragment } from 'react';

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
import StatusBadge from '../StatusBadge';
import Tooltip from '../Tooltip';
import FallbackNoDataTable from '../FallbackNoDataTable';
import RenderIf from '../RenderIf';
import { useUserRegisterWriteContext } from '@/contexts/context/user/UserRegisterWriteContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserRegisterWriteFilterType } from '@/types';
import { formatDateTime } from '@/lib/utils';

const UserRegisterWriteTableWithPagination = () => {
  const context = useUserRegisterWriteContext();
  const navigate = useNavigate();

  const currentPage = Number(context?.currentPage);
  const totalPages = context?.data?.totalPages || 0;

  const currentData = context?.data?.content || [];

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
    if (context?.setCurrentPage && page >= 1 && page <= totalPages) {
      context.setCurrentPage(page);

      const queryString = buildSearchParamsWithFilters(page, Number(context.perPage), context.valueFilter);

      navigate(`/user/register-to-write?${queryString}`, { replace: true });
    }
  };

  const buildSearchParamsWithFilters = (page: number, size: number, filters: UserRegisterWriteFilterType) => {
    const params = new URLSearchParams();

    params.set('page', String(page));
    params.set('size', String(size));

    if (filters.campaignName) params.set('campaignName', filters.campaignName);
    if (filters.endDate) params.set('endDate', String(filters.endDate));
    if (filters.startDate) params.set('startDate', String(filters.startDate));

    return params.toString();
  };

  return (
    <div className="w-full">
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {context?.titlesTable.map((title, index) => (
                <TableHead className={`${index === 0 || index === 1 ? 'pl-4' : ''}`} key={index}>
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(currentData) && currentData.length > 0 ? (
              currentData.map((regis, index) => (
                <TableRow key={index} className="odd:bg-muted/50">
                  <TableCell className="pl-4">{index + 1}</TableCell>
                  <TableCell className="font-medium">{regis.campaignName}</TableCell>
                  <TableCell>{`${formatDateTime(regis.startDate, 'dd/MM/yyyy HH:mm:ss')} - ${formatDateTime(
                    regis.endDate,
                    'dd/MM/yyyy HH:mm:ss',
                  )}`}</TableCell>
                  <TableCell className="pl-4">{regis.countTopicId}</TableCell>
                  <TableCell>
                    <StatusBadge status={regis.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      {context?.tooltips.map((item, idx) => (
                        <Fragment key={idx}>
                          <Link to={`/user/register-to-write/${regis.id}`}>
                            <div className="cursor-pointer">
                              <Tooltip
                                toolTipContent={item.content}
                                toolTipTrigger={<item.icon className={`size-5 ${item.className}`} />}
                              />
                            </div>
                          </Link>
                        </Fragment>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={context?.titlesTable.length} className="text-center">
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
              value={context?.perPage}
              setValue={(val) => {
                if (context?.setPerPage && context?.setCurrentPage) {
                  context.setPerPage(val);
                  context.setCurrentPage(1);

                  const queryString = buildSearchParamsWithFilters(1, Number(val), context.valueFilter);

                  navigate(`/user/register-to-write?${queryString}`, {
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

export default UserRegisterWriteTableWithPagination;
