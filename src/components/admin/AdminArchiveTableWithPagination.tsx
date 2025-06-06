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
import { AdminArchiveFilterType, AdminArchiveType } from '@/types';
import { useAdminArchiveContext } from '@/contexts/context/admin/AdminArchiveContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Tooltip from '../Tooltip';
import { Badge } from '../ui/badge';
import { formatDateTime } from '@/lib/utils';

type AdminArchiveTableWithPaginationProps = {
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  handleSelectAll: (checked: boolean, currentPageData: AdminArchiveType[]) => void;
  handleSelectRow: (id: string, checked: boolean) => void;
  isAllSelected: (currentPageData: AdminArchiveType[]) => boolean;
};

const AdminArchiveTableWithPagination = ({
  selectedRows,
  setSelectedRows,
  handleSelectAll,
  handleSelectRow,
  isAllSelected,
}: AdminArchiveTableWithPaginationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const archive = useAdminArchiveContext();

  const currentPage = Number(archive?.currentPage);
  const totalPages = archive?.data?.totalPages || 0;

  const currentData = archive?.data?.content || [];

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
    if (archive?.setCurrentPage && page >= 1 && page <= totalPages) {
      archive.setCurrentPage(page);

      const queryString = buildSearchParamsWithFilters(page, Number(archive.perPage), archive.valueFilter);

      navigate(`/admin/archive?${queryString}`, { replace: true });
    }
  };

  const buildSearchParamsWithFilters = (page: number, size: number, filters: AdminArchiveFilterType) => {
    const params = new URLSearchParams();

    params.set('page', String(page));
    params.set('size', String(size));

    if (filters.title) params.set('title', filters.title);
    if (filters.campaignName) params.set('campaignName', filters.campaignName);
    if (filters.authorName) params.set('authorName', filters.authorName);

    return params.toString();
  };

  return (
    <div className="w-full">
      <div className="text-sm text-muted-foreground mb-2">
        Đã chọn {selectedRows.length} / {archive?.data?.totalElements} bài viết
      </div>
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {archive?.titlesTable.map((title, index) => (
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
            <RenderIf value={!archive?.isLoading}>
              {Array.isArray(currentData) && currentData.length > 0 ? (
                currentData.map((arc, index) => (
                  <TableRow key={arc.id} className="odd:bg-muted/50">
                    <TableCell className="pl-4 w-12">
                      <RenderIf value={arc.status === 'Approved'}>
                        <Checkbox
                          checked={selectedRows.includes(arc.id)}
                          onCheckedChange={(checked) => handleSelectRow(arc.id, !!checked)}
                          aria-label="Select row"
                          className="border-emerald-500 translate-y-[2px]"
                        />
                      </RenderIf>
                    </TableCell>
                    <TableCell className="pl-4">{index + 1}</TableCell>
                    <TableCell className="pl-4">{arc.title}</TableCell>
                    <TableCell className="font-medium">{arc.topic}</TableCell>
                    <TableCell>{arc.authorName}</TableCell>
                    <TableCell>
                      <StatusBadge status={arc.status} />
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-cyan-600/10 dark:bg-cyan-600/20 hover:bg-cyan-600/10 text-cyan-500 border-cyan-600/60 shadow-none rounded-full">
                        {arc.campaignRegistration.topic.royaltyFee}
                      </Badge>
                    </TableCell>
                    <TableCell>{arc.campaignName}</TableCell>
                    <TableCell>
                      {arc.impactDate ? formatDateTime(arc.impactDate, 'dd/MM/yyyy HH:mm:ss') : 'Chưa phê duyệt'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-4">
                        {archive?.tooltips.map((item, idx) => (
                          <Link
                            to={`/view/articles/${arc.id}`}
                            className="cursor-pointer"
                            state={{ background: location }}
                            key={idx}
                          >
                            <Tooltip
                              toolTipContent={item.content}
                              toolTipTrigger={<item.icon className={item.className} />}
                            />
                          </Link>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={archive?.titlesTable.length} className="text-center">
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
              value={archive?.perPage}
              setValue={(val) => {
                if (archive?.setPerPage && archive?.setCurrentPage) {
                  archive.setPerPage(val);
                  archive.setCurrentPage(1);
                  setSelectedRows([]);

                  const queryString = buildSearchParamsWithFilters(1, Number(val), archive.valueFilter);

                  navigate(`/admin/archive?${queryString}`, {
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

export default AdminArchiveTableWithPagination;
