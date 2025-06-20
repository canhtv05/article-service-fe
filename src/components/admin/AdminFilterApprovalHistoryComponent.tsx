import { Fragment } from 'react';

import { Label } from '../ui/label';
import FieldsSelect from '../FieldsSelect';
import { DateRangePicker } from '../DateRangePicker';
import { DateRange } from 'react-day-picker';
import { parseISO } from 'date-fns';
import { useAdminApprovalHistoryContext } from '@/contexts/context/admin/AdminApprovalHistoryContext';
import { Input } from '../ui/input';

const AdminFilterApprovalHistoryComponent = () => {
  const approvalHistory = useAdminApprovalHistoryContext();

  if (!approvalHistory) return;

  const { endDate, startDate, status, title } = approvalHistory.valueFilter;

  const dateRange: DateRange | undefined =
    startDate || endDate
      ? {
          from: startDate ? parseISO(startDate) : undefined,
          to: endDate ? parseISO(endDate) : undefined,
        }
      : undefined;

  const handleChangeDate = (range: DateRange | undefined) => {
    approvalHistory?.setValueFilter((prev) => ({
      ...prev,
      startDate: range?.from ? range.from.toISOString() : '',
      endDate: range?.to ? range.to.toISOString() : '',
    }));
  };

  return (
    <Fragment>
      <div className="flex flex-col justify-end">
        <Label htmlFor="title" className="font-bold mb-2 leading-5">
          Tiêu đề bài viết:
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="Tìm kiếm theo tiêu đề bài viết"
          value={title}
          onChange={(e) => {
            approvalHistory.setValueFilter((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
        />
      </div>
      <div className="flex flex-col justify-end">
        <Label htmlFor="status" className="font-bold mb-2 leading-5">
          Trạng thái:
        </Label>
        <FieldsSelect
          id="status"
          placeholder="-- Chọn trạng thái --"
          data={[
            { label: 'Đã phê duyệt', value: 'Approved' },
            { label: 'Từ chối', value: 'Inactive' },
            { label: 'Đã gửi cho PR', value: 'SendToPR' },
            { label: 'Đã đăng', value: 'Published' },
          ]}
          label="Trạng thái"
          value={status}
          setValue={(val) => {
            if (typeof val === 'string' && approvalHistory && val !== status) {
              approvalHistory.setValueFilter((prev) => ({
                ...prev,
                status: val,
              }));
            }
          }}
        />
      </div>
      <div className="flex flex-col justify-end">
        <Label className="font-bold mb-2 leading-5">Ngày thao tác:</Label>
        <DateRangePicker value={dateRange} onChange={handleChangeDate} />
      </div>
    </Fragment>
  );
};

export default AdminFilterApprovalHistoryComponent;
