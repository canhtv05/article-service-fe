import { Pen, RefreshCw } from 'lucide-react';
import { DateRangePicker } from '../DateRangePicker';
import { Button } from '../ui/button';

import { Label } from '../ui/label';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { httpRequest } from '@/utils/httpRequest';
import { useCallback, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { parseISO } from 'date-fns';
import ConfirmDialog from '../ConfirmDialog';
import { toast } from 'sonner';
import { Status } from '@/enums';
import { handleMutationError } from '@/utils/handleMutationError';
import { Input } from '../ui/input';

interface AdminRegistrationPeriodChild {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalAssignedArticles: number;
}

interface ValueUpdate {
  name: string;
  startDate: string;
  endDate: string;
}

const AdminRegistrationPeriodChildUpdate = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: response } = useQuery<AdminRegistrationPeriodChild>({
    queryKey: ['/dot-bai-viet/chi-tiet-dot-con'],
    queryFn: async () => {
      const res = await httpRequest.get(`/dot-bai-viet/chi-tiet-dot-con/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const [data, setData] = useState<AdminRegistrationPeriodChild>({
    endDate: response?.endDate ?? '',
    startDate: response?.startDate ?? '',
    id: response?.id ?? '',
    name: response?.name ?? '',
    totalAssignedArticles: response?.totalAssignedArticles ?? 0,
  });

  useEffect(() => {
    if (response) {
      setData({
        id: response.id,
        name: response.name,
        startDate: response.startDate,
        endDate: response.endDate,
        totalAssignedArticles: response.totalAssignedArticles,
      });
    }
  }, [response]);

  const { endDate, startDate } = data;

  const dateRange: DateRange | undefined =
    startDate || endDate
      ? {
          from: startDate ? parseISO(startDate) : undefined,
          to: endDate ? parseISO(endDate) : undefined,
        }
      : undefined;

  const handleChangeDate = (range: DateRange | undefined) => {
    setData((prev) => ({
      ...prev,
      startDate: range?.from ? range.from.toISOString() : '',
      endDate: range?.to ? range.to.toISOString() : '',
    }));
  };

  const updateMutation = useMutation({
    mutationKey: ['update'],
    mutationFn: async (data: ValueUpdate) => await httpRequest.put(`/dot-bai-viet/sua-dot-con/${id}`, data),
    onSuccess: () => {
      toast.success(Status.UPDATE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['/dot-bai-viet/chi-tiet-dot-con'] });
    },
    onError: (error) => {
      handleMutationError(error);
    },
  });

  const handleUpdate = useCallback(async () => {
    if (!data.name) {
      toast.error('Không có tên');
      return;
    }

    const res = {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
    };
    await updateMutation.mutate(res);
  }, [data, updateMutation]);

  const handleClear = useCallback(() => {
    if (data) {
      const { endDate, name, startDate } = response!;
      setData((prev) => ({
        ...prev,
        endDate: endDate,
        name: name,
        startDate: startDate,
      }));
    }
  }, [data, response]);

  return (
    <div className="flex flex-col rounded-xl shadow-md p-5 text-foreground border">
      <div className="mb-10">{response?.name ?? ''}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-end">
          <Label htmlFor="campaign_name" className="font-bold mb-2 leading-5">
            Tên đợt:
          </Label>
          <Input
            id="campaign_name"
            type="text"
            placeholder="Tên đợt"
            value={data.name ?? ''}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex flex-col justify-end">
          <Label htmlFor="total_articles" className="font-bold mb-2 leading-5">
            Tổng số bài viết:
          </Label>
          <Input
            id="total_articles"
            type="number"
            disabled
            placeholder="Tổng số bài viết"
            value={data?.totalAssignedArticles}
            onChange={() => {}}
          />
        </div>
        <div className="flex flex-col justify-end">
          <Label className="font-bold mb-2 leading-5">Thời gian đăng ký:</Label>
          <DateRangePicker value={dateRange} onChange={handleChangeDate} />
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button customize="default" type="button" className="!py-5 px-6 flex gap-2 rounded-full" onClick={handleClear}>
          <RefreshCw />
          <span>Làm mới</span>
        </Button>
        <ConfirmDialog
          onContinue={handleUpdate}
          typeTitle={'chỉnh sửa'}
          triggerComponent={
            <Button customize="default" className="!py-5 px-6 flex gap-2 rounded-full">
              <Pen />
              <span>Cập nhật</span>
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default AdminRegistrationPeriodChildUpdate;
