import { List, Plus } from 'lucide-react';

import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import useViewport from '@/hooks/useViewport';
import { useSelector } from 'react-redux';
import AdminRegistrationTableDetailWithPagination from './AdminRegistrationTableDetailWithPagination';
import { useAdminRegistrationDetail } from '@/contexts/context/admin/AdminRegistrationDetailContext';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import DialogCustom from '../DialogCustom';
import { DateRange } from 'react-day-picker';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { DateRangePicker } from '../DateRangePicker';
import { parseISO } from 'date-fns';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import { Notice } from '@/enums';
import { formatDateTime } from '@/lib/utils';

interface ValueRegistration {
  name: string;
  startDate: string;
  endDate: string;
}

type CreateSubCampaignType = ValueRegistration & { writingCampaignId: string };

const AddSubCampaignPeriod = ({
  value,
  dateRange,
  handleChangeDateRange,
}: {
  value: ValueRegistration;
  dateRange: DateRange | undefined;
  handleChangeDateRange: (range: DateRange | undefined) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-end">
        <Label htmlFor="title" className="font-bold mb-2 leading-5">
          Tên đợt con:
        </Label>
        <Input id="title" type="text" placeholder="Tên đợt con" readOnly value={value.name} />
      </div>
      <div className="flex flex-col justify-end">
        <Label className="font-bold mb-2 leading-5">Thời gian:</Label>
        <DateRangePicker value={dateRange} onChange={handleChangeDateRange} />
      </div>
    </div>
  );
};

const AdminRegistrationTableDetail = () => {
  const { width } = useViewport();
  const context = useAdminRegistrationDetail();
  const open = useSelector((state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen);
  const maxWidth = open || width < 768 ? '100%' : `${width - 350}px`;
  const queryClient = useQueryClient();

  const [value, setValue] = useState<ValueRegistration>({
    endDate: '',
    name: '',
    startDate: '',
  });

  const { endDate, startDate } = value;

  const dateRange: DateRange | undefined =
    startDate || endDate
      ? {
          from: startDate ? parseISO(startDate) : undefined,
          to: endDate ? parseISO(endDate) : undefined,
        }
      : undefined;

  const handleChangeDate = (range: DateRange | undefined) => {
    setValue((prev) => ({
      ...prev,
      startDate: range?.from ? range.from.toISOString() : '',
      endDate: range?.to ? range.to.toISOString() : '',
    }));
  };

  const handleCreateSubCampaign = useCallback(() => {
    if (!context || context.dataDetail?.status === 'Inactive') {
      toast.error('Không thể tạo vì đợt đã ngưng hoạt động');
      return;
    }
  }, [context]);

  const createSubCampaign = useMutation({
    mutationKey: ['create-sub-campaign'],
    mutationFn: async (data: CreateSubCampaignType) => await httpRequest.post('/dot-bai-viet/tao-dot-con', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registration-child', context?.dataDetail?.id] });
      toast.success(Notice.ADD_SUCCESS);
    },
    onError: () => {
      toast.error(Notice.ADD_FAILED);
    },
  });

  const handleOnContinue = useCallback(() => {
    if (!context?.dataDetail) return;
    if (!value.startDate || !value.endDate) {
      toast.error('Vui lòng nhập đủ trường');
      return;
    }

    let subName = value.name;

    if (!value.name) {
      const startDate = formatDateTime(value.startDate, 'dd/MM/yyyy');
      const endDate = formatDateTime(value.endDate, 'dd/MM/yyyy');
      const name = Number(startDate.substring(3, 5));
      subName = `Tháng ${String(name)} (${startDate} - ${endDate})`;
    }

    const data = {
      writingCampaignId: context.dataDetail.id,
      ...value,
      name: subName,
    };

    createSubCampaign.mutate(data);
    setValue({
      endDate: '',
      name: '',
      startDate: '',
    });
  }, [value, createSubCampaign, context]);

  if (!context) return;

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
      <div className="flex gap-3 items-center justify-between mb-10 lg:flex-row flex-col">
        <div className="flex gap-3 items-center w-full">
          <List />
          <span className="text-foreground text-[18px]">Danh sách đợt viết bài</span>
        </div>
        <div className="grid grid-cols-2 lg:flex lg:flex-row gap-2">
          <Link to={`/admin/registration-period`}>
            <Button variant={'default'} className="py-5 rounded-full">
              Quay lại
            </Button>
          </Link>

          <DialogCustom
            component={
              <AddSubCampaignPeriod dateRange={dateRange} value={value} handleChangeDateRange={handleChangeDate} />
            }
            onContinue={handleOnContinue}
            title="Tạo đợt bài viết con"
            triggerComponent={
              <Button
                customize={'default'}
                className="py-5 rounded-full"
                disabled={context.dataDetail?.status === 'Inactive'}
                onClick={handleCreateSubCampaign}
              >
                <Plus />
                Tạo đợt bài viết con
              </Button>
            }
          />
        </div>
      </div>
      <div style={{ maxWidth }}>
        <AdminRegistrationTableDetailWithPagination />
      </div>
    </div>
  );
};

export default AdminRegistrationTableDetail;
