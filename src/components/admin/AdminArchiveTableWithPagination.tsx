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
import StatusBadge from '../StatusBadge';
import { AdminArchiveType } from '@/types';
import { useAdminArchiveContext } from '@/contexts/context/admin/AdminArchiveContext';
import { Fragment } from 'react/jsx-runtime';
import { Link, useLocation } from 'react-router-dom';
import Tooltip from '../Tooltip';

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
  const location = useLocation();
  const archive = useAdminArchiveContext();

  // Tính toán phân trang
  const perPage = Number(archive?.perPage) || 10;
  const currentPage = archive?.currentPage || 1;
  const totalItems = archive?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / perPage);

  // Lấy dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentData = archive?.data?.slice(startIndex, endIndex) || [];

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
    if (archive?.setCurrentPage && page >= 1 && page <= totalPages) {
      archive.setCurrentPage(page);
    }
  };

  return (
    <div className="w-full">
      <div className="text-sm text-muted-foreground mb-2">
        Đã chọn {selectedRows.length} / {totalItems} bài viết
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
            <RenderIf value={!!archive?.isLoading}>
              <TableRow className="h-[130px]">
                <TableCell colSpan={archive?.titlesTable.length} className="flex my-auto justify-center items-center">
                  <LoadingTable />
                </TableCell>
              </TableRow>
            </RenderIf>
            <RenderIf value={!archive?.isLoading}>
              {Array.isArray(currentData) && currentData.length > 0 ? (
                currentData.map((arc, index) => (
                  <TableRow key={arc.id} className="odd:bg-muted/50">
                    <TableCell className="pl-4 w-12">
                      <Checkbox
                        checked={selectedRows.includes(arc.id)}
                        onCheckedChange={(checked) => handleSelectRow(arc.id, !!checked)}
                        aria-label="Select row"
                        className="border-emerald-500 translate-y-[2px]"
                      />
                    </TableCell>
                    <TableCell className="pl-4">{startIndex + index + 1}</TableCell>
                    <TableCell className="pl-4">{arc.title}</TableCell>
                    <TableCell className="font-medium">{arc.topic_name}</TableCell>
                    <TableCell>{arc.author_name}</TableCell>
                    <TableCell>
                      <StatusBadge status={arc.status} />
                    </TableCell>
                    <TableCell>{arc.campaign_name}</TableCell>
                    <TableCell>{arc.approval_date}</TableCell>
                    <TableCell>
                      <div className="flex gap-4">
                        {archive?.tooltips.map((item, idx) => (
                          <Fragment key={idx}>
                            <RenderIf value={item.type === 'view'}>
                              <Link
                                to={`/view/articles/${arc.id}`}
                                className="cursor-pointer"
                                state={{ background: location }}
                              >
                                <Tooltip
                                  toolTipContent={item.content}
                                  toolTipTrigger={<item.icon className={item.className} />}
                                />
                              </Link>
                            </RenderIf>
                            <RenderIf value={item.type === 'copy'}>
                              <div className="cursor-pointer">
                                <Tooltip
                                  toolTipContent={item.content}
                                  toolTipTrigger={<item.icon className={item.className} />}
                                />
                              </div>
                            </RenderIf>
                            <RenderIf value={item.type === 'download'}>
                              <div className="cursor-pointer">
                                <Tooltip
                                  toolTipContent={item.content}
                                  toolTipTrigger={<item.icon className={item.className} />}
                                />
                              </div>
                            </RenderIf>
                          </Fragment>
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
      <RenderIf value={!!archive?.data && archive?.data?.length > 0}>
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
              value={archive?.perPage}
              setValue={(val) => {
                if (archive?.setPerPage && archive?.setCurrentPage) {
                  archive.setPerPage(val);
                  archive.setCurrentPage(1);
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

export default AdminArchiveTableWithPagination;
