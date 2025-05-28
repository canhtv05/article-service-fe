'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

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
import { AddUserToCampaignType } from '@/types';
import { Button } from '../ui/button';
import { UserPlus } from 'lucide-react';
import { Input } from '../ui/input';

const titlesTable = ['', '#', 'Giảng viên', 'Chủ đề', 'Số lượng bài viết', 'Hành động'];

type AddUserToCampaignWithPaginationProps = {
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  handleSelectAll: (checked: boolean, currentPageData: AddUserToCampaignType[]) => void;
  handleSelectRow: (id: string, checked: boolean) => void;
  isAllSelected: (currentPageData: AddUserToCampaignType[]) => boolean;
  handleAssign: () => void;
};

const AddUserToCampaignWithPagination = ({
  selectedRows,
  setSelectedRows,
  handleSelectAll,
  handleSelectRow,
  isAllSelected,
}: // handleAssign,
AddUserToCampaignWithPaginationProps) => {
  const { data: users, isLoading } = useQuery<AddUserToCampaignType[]>({
    queryKey: ['users_to_campaign'],
    queryFn: async () => {
      const response = await axios.get('/data_add_users_to_campaign.json');
      return response.data;
    },
  });

  const [data, setData] = useState<AddUserToCampaignType[] | undefined>(undefined);
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    if (users) {
      setData(users);
      const articles = users.map((user) => Number(user.number_of_articles));
      setValues(articles);
    }
  }, [users]);

  const totalItems = data?.length || 0;
  const totalPages = Math.ceil(totalItems / perPage);

  // Lấy dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentData = data?.slice(startIndex, endIndex) || [];

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
    if (setCurrentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleChange = (value: number, index: number) => {
    setValues((prev) => prev.map((val, idx) => (idx === index ? value : val)));
  };

  const handleDivide = () => {
    if (users) {
      const total = users.reduce((sum, user) => sum + Number(user.number_of_articles), 0);
      const n = users.length;
      const base = Math.floor(total / n);
      const extra = total % n;

      const result = users.map((_, index) => (index < extra ? base + 1 : base));
      setValues(result);
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
            <RenderIf value={!!isLoading}>
              <TableRow className="h-[130px]">
                <TableCell colSpan={titlesTable.length} className="flex my-auto justify-center items-center">
                  <LoadingTable />
                </TableCell>
              </TableRow>
            </RenderIf>
            <RenderIf value={!isLoading}>
              {Array.isArray(currentData) && currentData.length > 0 ? (
                currentData.map((user, index) => (
                  <TableRow key={index} className="odd:bg-muted/50">
                    <TableCell className="pl-4 w-12">
                      <Checkbox
                        checked={selectedRows.includes(user.id)}
                        onCheckedChange={(checked) => handleSelectRow(user.id, !!checked)}
                        aria-label="Select row"
                        className="border-emerald-500 translate-y-[2px]"
                      />
                    </TableCell>
                    <TableCell className="pl-4">{startIndex + index + 1}</TableCell>
                    <TableCell className="pl-4">{user.name}</TableCell>
                    <TableCell className="font-medium">{user.topic_name}</TableCell>
                    <TableCell>
                      <Input
                        value={values[index] + ''}
                        type="number"
                        onChange={(e) => handleChange(Number(e.target.value), index)}
                      ></Input>
                    </TableCell>
                    <TableCell>
                      <Button customize={'default'}>
                        <UserPlus />
                      </Button>
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
      <RenderIf value={!!data && data?.length > 0}>
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
          <div className="flex gap-3">
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
              value={perPage + ''}
              setValue={(val) => {
                if (setPerPage && setCurrentPage) {
                  setPerPage(Number(val));
                  setCurrentPage(1);
                  setSelectedRows([]); // Xóa lựa chọn khi thay đổi perPage
                }
              }}
            />
            <Button customize={'default'} onClick={handleDivide}>
              Chia đều
            </Button>
            <Button customize={'default'}>Thêm ngay</Button>
          </div>
        </div>
      </RenderIf>
    </div>
  );
};

export default AddUserToCampaignWithPagination;
