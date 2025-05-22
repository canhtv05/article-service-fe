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

const PRTopicTableWithPagination = () => {
  const topics = useContext(PRTopicManagementContext);

  // Tính toán phân trang
  const perPage = Number(topics?.perPage) || 10;
  const currentPage = topics?.currentPage || 1;
  const totalItems = topics?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / perPage);

  // Lấy dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentData = topics?.data?.slice(startIndex, endIndex) || [];

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
    }
  };

  const handleClick = (ma: string) => {
    topics?.handleToggleStatus(ma);
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
                  <TableRow key={topic.ma} className="odd:bg-muted/50">
                    <TableCell className="pl-4">{startIndex + index + 1}</TableCell>
                    <TableCell className="pl-4">{topic.ma}</TableCell>
                    <TableCell className="font-medium">{topic.topic_name}</TableCell>
                    <TableCell>{formatCurrencyVND(topic.royalty)}</TableCell>
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
                                onContinue={() => handleClick(topic.ma)}
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
                                ma={topic.ma}
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
      <RenderIf value={!!topics?.data && topics?.data?.length > 0}>
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
                { label: '100 / trang', value: 100 },
              ]}
              value={topics?.perPage}
              setValue={(val) => {
                if (topics?.setPerPage && topics?.setCurrentPage) {
                  topics.setPerPage(val);
                  topics.setCurrentPage(1);
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
