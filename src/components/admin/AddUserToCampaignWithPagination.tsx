import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import FallbackNoDataTable from '../FallbackNoDataTable';
import { AddUserToCampaignType } from '@/types';
import { Button } from '../ui/button';
import { UserPlus } from 'lucide-react';
import { Input } from '../ui/input';
import { httpRequest } from '@/utils/httpRequest';
import cookieUtil from '@/utils/cookieUtil';
import ConfirmDialog from '../ConfirmDialog';
import { handleMutationError } from '@/utils/handleMutationError';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

const titlesTable = ['', '#', 'Giảng viên', 'Chủ đề', 'Số lượng bài viết', 'Hành động'];
type DataAssign = {
  assignedArticleCount: number;
  id: string;
};

type AddUserToCampaignWithPaginationProps = {
  selectedRows: Record<string, string>;
  setSelectedRows: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleSelectAll: (checked: boolean, currentPageData: AddUserToCampaignType[]) => void;
  handleSelectRow: (user: AddUserToCampaignType, index: number, checked: boolean) => void;
};

const AddUserToCampaignWithPagination = ({
  selectedRows,
  setSelectedRows,
  handleSelectAll,
  handleSelectRow,
}: AddUserToCampaignWithPaginationProps) => {
  const queryClient = useQueryClient();

  const { id } = useParams();
  const { data: users } = useQuery<AddUserToCampaignType[]>({
    queryKey: ['/dot-bai-viet/danh-sach-giang-vien-dk'],
    queryFn: async () => {
      const response = await httpRequest.get(
        `/dot-bai-viet/danh-sach-giang-vien-dk/${cookieUtil.getStorage().parentId}`,
      );
      return response.data;
    },
  });

  const [data, setData] = useState<AddUserToCampaignType[] | undefined>(undefined);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    if (users) {
      setData(users);
      const articles = users.map((user) => Number(user.assignedArticleCount));
      setValues(articles);
    }
  }, [users]);

  const totalItems = data?.length || 0;
  const currentData = data || [];

  const handleChange = (value: number, index: number) => {
    setValues((prev) => prev.map((val, idx) => (idx === index ? value : val)));
  };

  const handleDivide = () => {
    if (values) {
      const total = values.reduce((sum, val) => sum + val, 0);
      const n = values.length;
      const base = Math.floor(total / n);
      const extra = total % n;

      const result = values.map((_, index) => (index < extra ? base + 1 : base));
      setValues(result);
    }
  };

  const assignMutation = useMutation({
    mutationKey: ['assign_campaign'],
    mutationFn: async (data: DataAssign) =>
      await httpRequest.put(`/dot-bai-viet/phan-cong-giang-vien/${data.id}`, {
        assignedArticleCount: data.assignedArticleCount,
        subCampaignId: id,
      }),
    onError: (error) => {
      handleMutationError(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/dot-bai-viet/danh-sach-giang-vien-dk'] });
      queryClient.invalidateQueries({ queryKey: ['/dot-bai-viet/chi-tiet-dot-con'] });
      queryClient.invalidateQueries({ queryKey: ['/dot-bai-viet/danh-sach-giang-vien-da-phan'] });
    },
  });

  const handleAssign = async (data: DataAssign) => {
    assignMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/dot-bai-viet/danh-sach-giang-vien-dk'] });
        queryClient.invalidateQueries({ queryKey: ['/dot-bai-viet/chi-tiet-dot-con'] });
        queryClient.invalidateQueries({ queryKey: ['/dot-bai-viet/danh-sach-giang-vien-da-phan'] });
        toast.success('Phân công thành công');
      },
    });
  };

  const handleAssignAll = async () => {
    if (!data || Object.keys(selectedRows).length === 0) return;

    const assignments: DataAssign[] = Object.entries(selectedRows).map(([index, userId]) => {
      const user = data?.find((u) => u.id === userId);
      return {
        subCampaignId: user?.subCampaignId ?? '',
        assignedArticleCount: values[Number(index)],
        id: userId,
      };
    });

    try {
      for (const item of assignments) {
        await assignMutation.mutateAsync(item);
      }
      queryClient.invalidateQueries({ queryKey: ['/dot-bai-viet/danh-sach-giang-vien-dk'] });
      toast.success('Phân công thành công');
      setSelectedRows({});
    } catch (error) {
      handleMutationError(error);
    }
  };

  return (
    <div className="w-full">
      <div className="text-sm text-muted-foreground mb-2">
        Đã chọn {Object.keys(selectedRows).length} / {totalItems} giảng viên
      </div>
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {titlesTable.map((title, index) => (
                <TableHead className={`${index <= 1 ? 'pl-4' : ''} ${index === 0 ? 'w-12' : ''}`} key={index}>
                  {index === 0 ? (
                    <Checkbox
                      checked={Object.keys(selectedRows).length === currentData.length && currentData.length > 0}
                      onCheckedChange={(checked) => handleSelectAll(!!checked, currentData)}
                      aria-label="Select all rows"
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
              currentData.map((user, index) => (
                <TableRow key={index} className="odd:bg-muted/50">
                  <TableCell className="pl-4 w-12">
                    <Checkbox
                      checked={selectedRows[index.toString()] !== undefined}
                      onCheckedChange={(checked) => handleSelectRow(user, index, !!checked)}
                      aria-label="Select row"
                      className="border-emerald-500 translate-y-[2px]"
                    />
                  </TableCell>
                  <TableCell className="pl-4">{index + 1}</TableCell>
                  <TableCell className="pl-4">{user.authorName}</TableCell>
                  <TableCell className="font-medium">{user.topicName}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min={0}
                      value={values[index] + ''}
                      onChange={(e) => handleChange(Number(e.target.value), index)}
                    />
                  </TableCell>
                  <TableCell>
                    <ConfirmDialog
                      onContinue={() => {
                        return handleAssign({
                          assignedArticleCount: values[index],
                          id: user.id,
                        });
                      }}
                      typeTitle="phân công"
                      triggerComponent={
                        <Button customize={'default'}>
                          <UserPlus />
                        </Button>
                      }
                    />
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
          </TableBody>
        </Table>
      </div>
      <div className="flex lg:flex-row flex-col justify-end gap-5 mt-4 items-center">
        <div className="flex gap-3">
          <Button customize={'default'} type="button" onClick={handleDivide}>
            Chia đều
          </Button>
          <ConfirmDialog
            onContinue={handleAssignAll}
            typeTitle="đóng đăng ký"
            triggerComponent={
              <Button customize={'default'} type="button" disabled={Object.entries(selectedRows).length === 0}>
                Thêm ngay
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AddUserToCampaignWithPagination;
