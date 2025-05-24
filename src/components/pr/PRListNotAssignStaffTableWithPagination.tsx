'use client';

import { useContext } from 'react';
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
import LoadingTable from '../LoadingTable';
import { PRStaffsContext } from '@/contexts/context/pr/PRStaffsContext';
import StatusBadge from '../StatusBadge';
import { PRStaffsType } from '@/types';

type PRListNotAssignStaffTableWithPaginationProps = {
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  handleSelectAll: (checked: boolean, currentPageData: PRStaffsType[]) => void;
  handleSelectRow: (id: string, checked: boolean) => void;
  isAllSelected: (currentPageData: PRStaffsType[]) => boolean;
};

const PRListNotAssignStaffTableWithPagination = ({
  selectedRows,
  setSelectedRows,
  handleSelectAll,
  handleSelectRow,
  isAllSelected,
}: PRListNotAssignStaffTableWithPaginationProps) => {
  const articles = useContext(PRStaffsContext);

  // Tính toán phân trang
  const perPage = Number(articles?.perPage) || 10;
  const currentPage = articles?.currentPage || 1;
  const totalItems = articles?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / perPage);

  // Lấy dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentData = articles?.data?.slice(startIndex, endIndex) || [];

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
    if (articles?.setCurrentPage && page >= 1 && page <= totalPages) {
      articles.setCurrentPage(page);
    }
  };

  // Cập nhật titlesTable để thêm cột checkbox
  const titlesTable = [
    ' ',
    ...(articles?.titlesTable || ['#', 'Tiêu đề', 'Chủ đề', 'Tác giả', 'Ngày tạo', 'Trạng thái']),
  ];

  return (
    <div className="w-full">
      <div className="text-sm text-muted-foreground mb-2">
        Đã chọn {selectedRows.length} / {totalItems} bài viết
      </div>
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {titlesTable.map((title, index) => (
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
            <RenderIf value={!!articles?.isLoading}>
              <TableRow className="h-[130px]">
                <TableCell colSpan={titlesTable.length} className="flex my-auto justify-center items-center">
                  <LoadingTable />
                </TableCell>
              </TableRow>
            </RenderIf>
            <RenderIf value={!articles?.isLoading}>
              {Array.isArray(currentData) && currentData.length > 0 ? (
                currentData.map((article, index) => (
                  <TableRow key={article.article_id} className="odd:bg-muted/50">
                    <TableCell className="pl-4 w-12">
                      <Checkbox
                        checked={selectedRows.includes(article.article_id)}
                        onCheckedChange={(checked) => handleSelectRow(article.article_id, !!checked)}
                        aria-label="Select row"
                        className="border-emerald-500 translate-y-[2px]"
                      />
                    </TableCell>
                    <TableCell className="pl-4">{startIndex + index + 1}</TableCell>
                    <TableCell className="pl-4">{article.title}</TableCell>
                    <TableCell className="font-medium">{article.topic_name}</TableCell>
                    <TableCell>{article.author_name}</TableCell>
                    <TableCell>{article.created_at}</TableCell>
                    <TableCell>
                      <StatusBadge status={article.status} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={titlesTable.length} className="text-center">
                    <FallbackNoDataTable />
                  </TableCell>
                </TableRow>
              )}
            </RenderIf>
          </TableBody>
        </Table>
      </div>
      <RenderIf value={!!articles?.data && articles?.data?.length > 0}>
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
              value={articles?.perPage}
              setValue={(val) => {
                if (articles?.setPerPage && articles?.setCurrentPage) {
                  articles.setPerPage(val);
                  articles.setCurrentPage(1);
                  setSelectedRows([]); // Xóa lựa chọn khi thay đổi perPage
                }
              }}
            />
          </div>
        </div>
      </RenderIf>
    </div>
  );
};

export default PRListNotAssignStaffTableWithPagination;
