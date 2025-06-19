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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserListArticlesContext } from '@/contexts/context/user/UserListArticlesContext';
import { UserListArticlesFilterType } from '@/types';
import { formatDateTime } from '@/lib/utils';

const UserListArticlesTableWithPagination = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useUserListArticlesContext();

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

      navigate(`/user/list-articles?${queryString}`, { replace: true });
    }
  };

  const buildSearchParamsWithFilters = (page: number, size: number, filters: UserListArticlesFilterType) => {
    const params = new URLSearchParams();

    params.set('page', String(page));
    params.set('size', String(size));

    if (filters.campaignId) params.set('campaignId', filters.campaignId);
    if (filters.status) params.set('status', filters.status);
    if (filters.endDate) params.set('endDate', String(filters.endDate));
    if (filters.startDate) params.set('startDate', String(filters.startDate));
    if (filters.title) params.set('title', String(filters.title));
    if (filters.topicName) params.set('topicName', String(filters.topicName));

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
                  <TableCell className="pl-4">{regis.title}</TableCell>
                  <TableCell className="font-medium">{regis.topic}</TableCell>
                  <TableCell>{formatDateTime(regis.submittedAt, 'dd/MM/yyyy')}</TableCell>
                  <TableCell className="pl-4">{regis.campaignName}</TableCell>
                  <TableCell>
                    <StatusBadge status={regis.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      {context?.tooltips.map((item, idx) => (
                        <Fragment key={idx}>
                          <Link to={`/view/articles/${regis.id}`} state={{ background: location }}>
                            <div className="cursor-pointer">
                              <Tooltip
                                toolTipContent={item.content}
                                toolTipTrigger={<item.icon className={`size-5`} />}
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

                  navigate(`/user/list-articles?${queryString}`, {
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

export default UserListArticlesTableWithPagination;
