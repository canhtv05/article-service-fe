import { Pen, RefreshCw } from 'lucide-react';
import { DateRangePicker } from '../DateRangePicker';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAdminRegistrationDetail } from '@/contexts/context/admin/AdminRegistrationDetailContext';
import { parseISO } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import { toast } from 'sonner';
import { Notice } from '@/enums';
import ConfirmDialogForm, { AlertDialogRef } from '../ConfirmDialogForm';

interface DataUpdate {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  writingEndDate: string;
  writingStartDate: string;
  status: string;
}

type ValueRegisDetailUpdate = Omit<DataUpdate, 'id' | 'status'>;

const AdminRegistrationPeriodDetailUpdate = () => {
  const context = useAdminRegistrationDetail();
  const queryClient = useQueryClient();
  const dialogRef = useRef<AlertDialogRef>(null);

  const [value, setValue] = useState<ValueRegisDetailUpdate>({
    endDate: '',
    name: '',
    startDate: '',
    writingEndDate: '',
    writingStartDate: '',
  });

  const handleClear = useCallback(() => {
    if (context?.dataDetail) {
      const {
        endDate: _endDate,
        name: _name,
        startDate: _startDate,
        writingEndDate: _writingEndDate,
        writingStartDate: _writingStartDate,
      } = context.dataDetail;
      setValue({
        endDate: _endDate,
        name: _name,
        startDate: _startDate,
        writingEndDate: _writingEndDate,
        writingStartDate: _writingStartDate,
      });
    }
  }, [context?.dataDetail]);

  useEffect(() => {
    handleClear();
  }, [handleClear]);

  const { endDate, name, startDate, writingEndDate, writingStartDate } = value;

  const dateRange: DateRange | undefined =
    startDate || endDate
      ? {
          from: startDate ? parseISO(startDate) : undefined,
          to: endDate ? parseISO(endDate) : undefined,
        }
      : undefined;

  const dateRangeDeadline: DateRange | undefined =
    writingStartDate || writingEndDate
      ? {
          from: writingStartDate ? parseISO(writingStartDate) : undefined,
          to: writingEndDate ? parseISO(writingEndDate) : undefined,
        }
      : undefined;

  const handleChangeDate = (range: DateRange | undefined) => {
    setValue((prev) => ({
      ...prev,
      _startDate: range?.from ? range.from.toISOString() : '',
      _endDate: range?.to ? range.to.toISOString() : '',
    }));
  };

  const handleChangeDateDeadline = (range: DateRange | undefined) => {
    setValue((prev) => ({
      ...prev,
      _startDate: range?.from ? range.from.toISOString() : '',
      _endDate: range?.to ? range.to.toISOString() : '',
    }));
  };

  const updateRegistrationPeriod = useMutation({
    mutationKey: ['update-registration-period'],
    mutationFn: async (data: DataUpdate) =>
      await httpRequest.put(`/dot-bai-viet/sua-dot/${data.id}`, {
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        writingStartDate: data.writingStartDate,
        writingEndDate: data.writingEndDate,
        status: data.status,
      }),
    onSuccess: (response) => {
      toast.success(Notice.UPDATE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['registration-detail'] });
      console.log(response);
    },
    onError: () => {
      toast.error(Notice.UPDATE_FAILED);
    },
  });

  const handleUpdate = useCallback(() => {
    if (!context?.dataDetail?.id) {
      toast.error(Notice.ERROR);
      return;
    }

    const data = {
      id: context.dataDetail.id,
      status: context.dataDetail.status,
      ...value,
    };

    updateRegistrationPeriod.mutate(data);
  }, [context, updateRegistrationPeriod, value]);

  const handleShowDialog = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dialogRef.current?.open();
  };

  return (
    <form onSubmit={handleShowDialog} className="flex flex-col rounded-xl shadow-md p-5 text-foreground border">
      <div className="mb-10">{name}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-end">
          <Label htmlFor="id" className="font-bold mb-2 leading-5">
            Mã đợt:
          </Label>
          <Input id="id" type="text" placeholder="Mã đợt" value={context?.dataDetail?.id ?? ''} disabled />
        </div>
        <div className="flex flex-col justify-end">
          <Label htmlFor="campaign_name" className="font-bold mb-2 leading-5">
            Tên đợt đăng ký
          </Label>
          <Input
            id="campaign_name"
            type="text"
            placeholder="Tên đợt đăng ký"
            value={name ?? ''}
            onChange={(e) =>
              setValue((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex flex-col justify-end">
          <Label className="font-bold mb-2 leading-5">Thời gian đăng ký:</Label>
          <DateRangePicker value={dateRangeDeadline} onChange={handleChangeDate} />
        </div>
        <div className="flex flex-col justify-end">
          <Label className="font-bold mb-2 leading-5">Thời gian:</Label>
          <DateRangePicker value={dateRange} onChange={handleChangeDateDeadline} />
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button customize="default" type="button" className="!py-5 px-6 flex gap-2 rounded-full" onClick={handleClear}>
          <RefreshCw />
          <span>Làm mới</span>
        </Button>
        <Button customize="default" type="submit" className="!py-5 px-6 flex gap-2 rounded-full">
          <Pen />
          <span>Cập nhật</span>
        </Button>
      </div>
      <ConfirmDialogForm typeTitle="chỉnh sửa" ref={dialogRef} onContinue={handleUpdate} />
    </form>
  );
};

export default AdminRegistrationPeriodDetailUpdate;
