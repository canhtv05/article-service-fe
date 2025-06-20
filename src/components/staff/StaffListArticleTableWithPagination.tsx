import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { Status } from '@/enums';
import { StaffListArticlesContext } from '@/contexts/context/staff/StaffListArticlesContext';
import { StaffListArticleFilterType } from '@/types';
import { formatDateTime } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';

const StaffListArticleTableWithPagination = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const articles = useContext(StaffListArticlesContext);

  const currentPage = Number(articles?.currentPage);
  const totalPages = articles?.data?.totalPages || 0;

  const currentData = articles?.data?.content || [];

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

      const queryString = buildSearchParamsWithFilters(page, Number(articles.perPage), articles.valueFilter);

      navigate(`/staff/list-articles?${queryString}`, { replace: true });
    }
  };

  const buildSearchParamsWithFilters = (page: number, size: number, filters: StaffListArticleFilterType) => {
    const params = new URLSearchParams();

    params.set('page', String(page));
    params.set('size', String(size));

    if (filters.assignerName) params.set('assignerName', filters.assignerName);
    if (filters.status) params.set('status', filters.status);
    if (filters.titleAndAuthorName) params.set('titleAndAuthorName', String(filters.titleAndAuthorName));
    if (filters.topicId) params.set('topicId', String(filters.topicId));
    if (filters.writingCampaignId) params.set('writingCampaignId', String(filters.writingCampaignId));

    return params.toString();
  };

  const handleApprovalArticle = useMutation({
    mutationKey: ['approve-article'],
    mutationFn: async (id: string) => await httpRequest.get(`/admin/bai-viet/tu-choi-bai-viet/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === '/admin/bai-viet/danh-sach-bai-viet-phan-cong',
      });
      toast.success(Status.UPDATE_SUCCESS);
      navigate('/staff/list-articles?page=1&size=5', { replace: true });
    },
    onError: () => {
      toast.error(Status.UPDATE_FAILED);
    },
  });

  const handlePostArticle = useMutation({
    mutationKey: ['approve-article'],
    mutationFn: async (id: string) => await httpRequest.get(`/chu-de/quan-ly-dang-bai/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === '/admin/bai-viet/danh-sach-bai-viet-phan-cong',
      });
      toast.success(Status.UPDATE_SUCCESS);
      navigate('/staff/list-articles?page=1&size=5', { replace: true });
    },
    onError: () => {
      toast.error(Status.UPDATE_FAILED);
    },
  });

  const handleReject = (id: string) => {
    handleApprovalArticle.mutate(id);
  };

  const handlePublish = (id: string) => {
    handlePostArticle.mutate(id);
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
            {Array.isArray(currentData) && currentData.length > 0 ? (
              currentData.map((article, index) => (
                <TableRow key={index} className="odd:bg-muted/50">
                  <TableCell className="pl-4">{index + 1}</TableCell>
                  <TableCell className="pl-4">{article?.title}</TableCell>
                  <TableCell className="font-medium">{article?.authorName}</TableCell>
                  <TableCell>{article?.topcicName}</TableCell>
                  <TableCell className="pl-4">
                    {article?.createdAt ? formatDateTime(article?.createdAt, 'dd/MM/yyyy') : ''}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={article?.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4">
                      {articles?.tooltips.map((item, idx) => (
                        <Fragment key={idx}>
                          <RenderIf value={item.type === 'not_publish'}>
                            <ConfirmDialog
                              key={idx}
                              onContinue={() => handleReject(article.id)}
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
                          <RenderIf value={item.type === 'publish'}>
                            <ConfirmDialog
                              key={idx}
                              onContinue={() => handlePublish(article.id)}
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
                              to={`/view/articles/${article.id}`}
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
              value={articles?.perPage}
              setValue={(val) => {
                if (articles?.setPerPage && articles?.setCurrentPage) {
                  articles.setPerPage(val);
                  articles.setCurrentPage(1);

                  const queryString = buildSearchParamsWithFilters(1, Number(val), articles.valueFilter);

                  navigate(`/staff/list-articles?${queryString}`, {
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

export default StaffListArticleTableWithPagination;
