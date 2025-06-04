import { useContext, useState } from 'react';
import { Check, ClockFading, List, Plus, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import ConfirmDialog from '../ConfirmDialog';
import { Notice } from '@/enums';
import { AdminRegistrationPeriodType } from '@/types';
import { AdminRegistrationPeriodContext } from '@/contexts/context/admin/AdminRegistrationPeriodContext';
import AdminRegistrationTableWithPagination from './AdminRegistrationTableWithPagination';
import DialogCustom from '../DialogCustom';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { DateRange } from 'react-day-picker';
import { format, parseISO } from 'date-fns';
import { DateRangePicker } from '../DateRangePicker';

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
        <Input id="title" type="text" placeholder="Tên đợt đăng ký" readOnly value={value.campaign_name} />
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
  campaign_name: string;
  campaign_period_start_date: string;
  campaign_period_end_date: string;
  campaign_deadline_start_date: string;
  campaign_deadline_end_date: string;
}

const AdminRegistrationTable = () => {
  const registrationPeriod = useContext(AdminRegistrationPeriodContext);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const [value, setValue] = useState<ValueRegistration>({
    campaign_deadline_end_date: '',
    campaign_deadline_start_date: '',
    campaign_name: '',
    campaign_period_end_date: '',
    campaign_period_start_date: '',
  });

  const {
    campaign_deadline_end_date,
    campaign_deadline_start_date,
    campaign_period_end_date,
    campaign_period_start_date,
  } = value;

  const dateRangePeriod: DateRange | undefined =
    campaign_period_start_date || campaign_period_end_date
      ? {
          from: campaign_period_start_date ? parseISO(campaign_period_start_date) : undefined,
          to: campaign_period_end_date ? parseISO(campaign_period_end_date) : undefined,
        }
      : undefined;

  const dateRangeDeadline: DateRange | undefined =
    campaign_deadline_start_date || campaign_deadline_end_date
      ? {
          from: campaign_deadline_start_date ? parseISO(campaign_deadline_start_date) : undefined,
          to: campaign_deadline_end_date ? parseISO(campaign_deadline_end_date) : undefined,
        }
      : undefined;

  const handleChangeDatePeriod = (range: DateRange | undefined) => {
    setValue((prev) => ({
      ...prev,
      campaign_period_start_date: range?.from ? range.from.toISOString() : '',
      campaign_period_end_date: range?.to ? range.to.toISOString() : '',
    }));
  };

  const handleChangeDateDeadline = (range: DateRange | undefined) => {
    setValue((prev) => ({
      ...prev,
      campaign_deadline_start_date: range?.from ? range.from.toISOString() : '',
      campaign_deadline_end_date: range?.to ? range.to.toISOString() : '',
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

  const handleAssign = () => {
    toast.success(Notice.UPDATE_SUCCESS);
    setSelectedRows([]);
    registrationPeriod?.setData((prev) => {
      if (!prev) return [];
      return prev.filter((article) => !selectedRows.includes(article.id));
    });
  };

  const handleOnContinue = () => {
    const {
      campaign_deadline_end_date,
      campaign_deadline_start_date,
      campaign_period_end_date,
      campaign_period_start_date,
    } = value;
    if (
      !campaign_deadline_end_date ||
      !campaign_deadline_start_date ||
      !campaign_period_end_date ||
      !campaign_period_start_date
    ) {
      toast.error('Vui lòng nhập đủ các trường');
      return;
    }

    const formattedPeriodStart = format(parseISO(campaign_period_start_date), 'dd/MM/yyyy HH:mm:ss');
    const formattedPeriodEnd = format(parseISO(campaign_period_end_date), 'dd/MM/yyyy HH:mm:ss');
    const formattedDeadlineStart = format(parseISO(campaign_deadline_start_date), 'dd/MM/yyyy HH:mm:ss');
    const formattedDeadlineEnd = format(parseISO(campaign_deadline_end_date), 'dd/MM/yyyy HH:mm:ss');

    const campaignName = `Đợt ${format(parseISO(campaign_period_start_date), 'dd/MM/yyyy')} - ${format(
      parseISO(campaign_period_end_date),
      'dd/MM/yyyy',
    )}`;

    setValue((prev) => ({
      ...prev,
      campaign_name: campaignName,
    }));

    const now = new Date();
    const id = `id-${format(now, 'yyyyMMdd-HHmmss-SSS')}`;

    const data: AdminRegistrationPeriodType = {
      id,
      name: campaignName,
      time: `${formattedPeriodStart} - ${formattedPeriodEnd}`,
      time_registration: `${formattedDeadlineStart} - ${formattedDeadlineEnd}`,
      campaign_period: 0,
      status: 'Đóng đăng ký',
    };

    registrationPeriod?.setData((prev) => [data, ...(prev || [])]);
    setValue({
      campaign_deadline_end_date: '',
      campaign_deadline_start_date: '',
      campaign_name: '',
      campaign_period_end_date: '',
      campaign_period_start_date: '',
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
      <div className="flex gap-3 items-center justify-between mb-10 lg:flex-row flex-col">
        <div className="flex gap-3 items-center w-full">
          <List />
          <span className="text-foreground text-[18px]">Danh sách đợt đăng ký</span>
        </div>
        <div className="grid grid-cols-2 lg:flex lg:flex-row gap-2 w-full">
          <Button customize={'default'} className="py-5 rounded-full">
            <ClockFading />
            Lịch sử
          </Button>
          <ConfirmDialog
            onContinue={handleAssign}
            typeTitle="mở đăng ký"
            triggerComponent={
              <Button customize={'default'} className="py-5 rounded-full" disabled={selectedRows.length === 0}>
                <Check />
                Mở đăng ký
              </Button>
            }
          />
          <ConfirmDialog
            onContinue={handleAssign}
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
