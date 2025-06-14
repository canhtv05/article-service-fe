import { useContext } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import FallbackNoDataTable from '../FallbackNoDataTable';
import { PRStaffsContext } from '@/contexts/context/pr/PRStaffsContext';
import StatusBadge from '../StatusBadge';
import { PRStaffsType } from '@/types';
import { Checkbox } from '../ui/checkbox';
import { formatDateTime } from '@/lib/utils';

type PRListNotAssignStaffTableWithPaginationProps = {
  selectedRows: string[];
  handleSelectAll: (checked: boolean, currentPageData: PRStaffsType[]) => void;
  handleSelectRow: (id: string, checked: boolean) => void;
  isAllSelected: (currentPageData: PRStaffsType[]) => boolean;
};

const PRListNotAssignStaffTableWithPagination = ({
  selectedRows,
  handleSelectAll,
  handleSelectRow,
  isAllSelected,
}: PRListNotAssignStaffTableWithPaginationProps) => {
  const articles = useContext(PRStaffsContext);
  const currentData = articles?.data || [];

  return (
    <div className="w-full">
      <div className="text-sm text-muted-foreground mb-2">
        Đã chọn {selectedRows.length} / {articles?.data?.length} bài viết
      </div>
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {articles?.titlesTable.map((title, index) => (
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
            {Array.isArray(currentData) && currentData.length > 0 ? (
              currentData.map((article, index) => (
                <TableRow key={article.id} className="odd:bg-muted/50">
                  <TableCell className="pl-4 w-12">
                    <Checkbox
                      checked={selectedRows.includes(article.id)}
                      onCheckedChange={(checked) => handleSelectRow(article.id, !!checked)}
                      aria-label="Select row"
                      className="border-emerald-500 translate-y-[2px]"
                    />
                  </TableCell>
                  <TableCell className="pl-4">{index + 1}</TableCell>
                  <TableCell className="pl-4">{article.title}</TableCell>
                  <TableCell className="font-medium">{article.topic}</TableCell>
                  <TableCell>{article.authorName}</TableCell>
                  <TableCell>{formatDateTime(article.createdAt, 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                  <TableCell>
                    <StatusBadge status={article.status} />
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
    </div>
  );
};

export default PRListNotAssignStaffTableWithPagination;
