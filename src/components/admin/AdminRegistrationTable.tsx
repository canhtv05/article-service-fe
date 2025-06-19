import { useContext, useState } from 'react';
import { Check, List, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import ConfirmDialog from '../ConfirmDialog';
import { AdminRegistrationPeriodType } from '@/types';
import { AdminRegistrationPeriodContext } from '@/contexts/context/admin/AdminRegistrationPeriodContext';
import AdminRegistrationTableWithPagination from './AdminRegistrationTableWithPagination';
import DialogCustom from '../DialogCustom';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { DateRange } from 'react-day-picker';
import { format, isWithinInterval, parseISO } from 'date-fns';
import { DateRangePicker } from '../DateRangePicker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import { Notice } from '@/enums';

type Assign = 'Open' | 'NotOpen';

const AddCampaignPeriod = ({
  value,
  dateRangePeriod,
  dateRangeDeadline,
  handleChangeDatePeriod,
  handleChangeDateDeadline,
}: {
  value: ValueRegistration;
  dateRangePeriod: DateRange | undefined;
  dateRangeDeadline: DateRange | undefined;
  handleChangeDatePeriod: (range: DateRange | undefined) => void;
  handleChangeDateDeadline: (range: DateRange | undefined) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-end">
        <Label htmlFor="title" className="font-bold mb-2 leading-5">
          Tên:
        </Label>
        <Input id="title" type="text" placeholder="Tên đợt đăng ký" readOnly value={value.name} />
      </div>
      <div className="flex flex-col justify-end">
        <Label className="font-bold mb-2 leading-5">Đợt đăng ký:</Label>
        <DateRangePicker value={dateRangePeriod} onChange={handleChangeDatePeriod} />
      </div>
      <div className="flex flex-col justify-end">
        <Label className="font-bold mb-2 leading-5">Hạn đăng ký:</Label>
        <DateRangePicker value={dateRangeDeadline} onChange={handleChangeDateDeadline} />
      </div>
    </div>
  );
};

interface ValueRegistration {
  name: string;
  startDate: string;
  endDate: string;
  writingStartDate: string;
  writingEndDate: string;
}

const AdminRegistrationTable = () => {
  const registrationPeriod = useContext(AdminRegistrationPeriodContext);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const [value, setValue] = useState<ValueRegistration>({
    endDate: '',
    name: '',
    startDate: '',
    writingEndDate: '',
    writingStartDate: '',
  });

  const { endDate, startDate, writingEndDate, writingStartDate } = value;

  const dateRangePeriod: DateRange | undefined =
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

  const handleChangeDatePeriod = (range: DateRange | undefined) => {
    setValue((prev) => ({
      ...prev,
      startDate: range?.from ? range.from.toISOString() : '',
      endDate: range?.to ? range.to.toISOString() : '',
    }));
  };

  const handleChangeDateDeadline = (range: DateRange | undefined) => {
    setValue((prev) => ({
      ...prev,
      writingStartDate: range?.from ? range.from.toISOString() : '',
      writingEndDate: range?.to ? range.to.toISOString() : '',
    }));
  };

  // Xử lý chọn/tắt tất cả
  const handleSelectAll = (checked: boolean, currentPageData: AdminRegistrationPeriodType[]) => {
    if (checked) {
      setSelectedRows(currentPageData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Xử lý chọn/tắt từng hàng
  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, id]);
    } else {
      setSelectedRows((prev) => prev.filter((rowId) => rowId !== id));
    }
  };

  // Kiểm tra trạng thái chọn tất cả
  const isAllSelected = (currentPageData: AdminRegistrationPeriodType[]) =>
    currentPageData.length > 0 && selectedRows.length === currentPageData.length;

  const sendToPrMutation = useMutation({
    mutationFn: async (type: Assign) => {
      const data =
        registrationPeriod?.data?.content.filter((c) => {
          return c.status !== type;
        }) ?? [];

      const commonIds = selectedRows.filter((id) => data.some((item) => item.id === id));

      const url = type === 'Open' ? 'dot-bai-viet/mo-dot-dk' : 'dot-bai-viet/dong-dot-dk';

      await Promise.all(
        commonIds.map((id) => {
          return httpRequest.get(`/${url}/${id}`);
        }),
      );
    },
    onSuccess: () => {
      // setSelectedRows([]);
      queryClient.invalidateQueries({ queryKey: ['/dot-bai-viet/danh-sanh-dot'] });
      toast.success('Cập nhật trạng thái thành công');
    },
    onError: (error) => {
      toast.error(error.message ?? 'Có lỗi xảy ra');
    },
  });

  const handleAssign = (type: Assign) => {
    if (selectedRows.length !== 0) sendToPrMutation.mutate(type);
  };

  const createWritingCampaign = useMutation({
    mutationKey: ['create'],
    mutationFn: async (data: ValueRegistration) => await httpRequest.post('/dot-bai-viet/tao-dot-bai-viet', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/dot-bai-viet/danh-sanh-dot'] });
      toast.success(Notice.ADD_SUCCESS);
    },
    onError: (error) => {
      toast.error(error.message ?? 'Có lỗi xảy ra');
    },
  });

  const handleOnContinue = () => {
    const { writingEndDate, writingStartDate, endDate, startDate } = value;

    if (!writingEndDate || !writingStartDate || !endDate || !startDate) {
      toast.error('Vui lòng nhập đủ các trường');
      return;
    }

    const writingStart = parseISO(writingStartDate);
    const writingEnd = parseISO(writingEndDate);
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    const isWritingStartValid = isWithinInterval(writingStart, { start, end });
    const isWritingEndValid = isWithinInterval(writingEnd, { start, end });

    if (!isWritingStartValid || !isWritingEndValid) {
      toast.error('Hạn đăng ký phải nằm trong đợt đăng ký');
      return;
    }

    const campaignName = `Đợt ${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')}`;

    const data: ValueRegistration = {
      name: campaignName,
      startDate,
      endDate,
      writingStartDate,
      writingEndDate,
    };

    createWritingCampaign.mutate(data);

    setValue({
      writingEndDate: '',
      writingStartDate: '',
      name: '',
      endDate: '',
      startDate: '',
    });
  };
  // còn tạo đợt dăng ký xem sửa xóa

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
      <div className="flex gap-3 items-center justify-between mb-10 lg:flex-row flex-col">
        <div className="flex gap-3 items-center w-full">
          <List />
          <span className="text-foreground text-[18px]">Danh sách đợt đăng ký</span>
        </div>
        <div className="grid grid-cols-2 lg:flex lg:flex-row justify-end gap-2 w-full">
          <ConfirmDialog
            onContinue={() => handleAssign('Open')}
            typeTitle="mở đăng ký"
            triggerComponent={
              <Button customize={'default'} className="py-5 rounded-full" disabled={selectedRows.length === 0}>
                <Check />
                Mở đăng ký
              </Button>
            }
          />
          <ConfirmDialog
            onContinue={() => handleAssign('NotOpen')}
            typeTitle="đóng đăng ký"
            triggerComponent={
              <Button customize={'default'} className="py-5 rounded-full" disabled={selectedRows.length === 0}>
                <X />
                Đóng đăng ký
              </Button>
            }
          />

          <DialogCustom
            component={
              <AddCampaignPeriod
                dateRangeDeadline={dateRangeDeadline}
                dateRangePeriod={dateRangePeriod}
                handleChangeDateDeadline={handleChangeDateDeadline}
                handleChangeDatePeriod={handleChangeDatePeriod}
                value={value}
              />
            }
            onContinue={handleOnContinue}
            title="Tạo đợt đăng ký"
            triggerComponent={
              <Button customize={'default'} className="py-5 rounded-full" type="submit">
                <Plus />
                Tạo đợt đăng ký
              </Button>
            }
          />
        </div>
      </div>
      <AdminRegistrationTableWithPagination
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        handleSelectAll={handleSelectAll}
        handleSelectRow={handleSelectRow}
        isAllSelected={isAllSelected}
      />
    </div>
  );
};

export default AdminRegistrationTable;
