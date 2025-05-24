import { Link, useLocation } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { toast } from 'sonner';

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
import ConfirmDialog from '../ConfirmDialog';
import RenderIf from '../RenderIf';
import LoadingTable from '../LoadingTable';
import { Notice } from '@/enums';
import { StaffListArticlesContext } from '@/contexts/context/staff/StaffListArticlesContext';

const StaffListArticleTableWithPagination = () => {
  const location = useLocation();
  const articles = useContext(StaffListArticlesContext);

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

  const handleClick = () => {
    toast.success(Notice.UPDATE_SUCCESS);
  };

  return (
    <div className="w-full">
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {articles?.titlesTable.map((title, index) => (
                <TableHead className={`${index === 0 || index === 1 ? 'pl-4' : ''}`} key={index}>
                  {title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <RenderIf value={!!articles?.isLoading}>
              <TableRow className="h-[130px]">
                <TableCell colSpan={articles?.titlesTable.length} className="flex my-auto justify-center items-center">
                  <LoadingTable />
                </TableCell>
              </TableRow>
            </RenderIf>
            <RenderIf value={!articles?.isLoading}>
              {Array.isArray(currentData) && currentData.length > 0 ? (
                currentData.map((article, index) => (
                  <TableRow key={index} className="odd:bg-muted/50">
                    <TableCell className="pl-4">{startIndex + index + 1}</TableCell>
                    <TableCell className="pl-4">{article.title}</TableCell>
                    <TableCell className="font-medium">{article.author_name}</TableCell>
                    <TableCell>{article.topic_name}</TableCell>
                    <TableCell className="pl-4">{article.created_at}</TableCell>
                    <TableCell>
                      <StatusBadge status={article.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-4">
                        {articles?.tooltips.map((item, idx) => (
                          <Fragment key={idx}>
                            <RenderIf value={item.type !== 'view'}>
                              <ConfirmDialog
                                key={idx}
                                onContinue={handleClick}
                                typeTitle={'chỉnh sửa'}
                                triggerComponent={
                                  <div className="cursor-pointer">
                                    <Tooltip
                                      toolTipContent={item.content}
                                      toolTipTrigger={<item.icon className={`size-5 ${item.className}`} />}
                                    />
                                  </div>
                                }
                              />
                            </RenderIf>
                            <RenderIf value={item.type === 'view'}>
                              <Link
                                to={`/view/articles/${article.article_id}`}
                                state={{ background: location }}
                                className="cursor-pointer"
                              >
                                <Tooltip
                                  toolTipContent={item.content}
                                  toolTipTrigger={<item.icon className={`size-5 ${item.className}`} />}
                                />
                              </Link>
                            </RenderIf>
                          </Fragment>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={articles?.titlesTable.length} className="text-center">
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
                }
              }}
            />
          </div>
        </div>
      </RenderIf>
    </div>
  );
};

export default StaffListArticleTableWithPagination;
