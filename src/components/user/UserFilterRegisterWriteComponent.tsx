import { Fragment } from 'react';

import { Label } from '../ui/label';
import { useUserRegisterWriteContext } from '@/contexts/context/user/UserRegisterWriteContext';
import { parseISO } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '../DateRangePicker';
import { Input } from '../ui/input';

const UserFilterRegisterWriteComponent = () => {
  const context = useUserRegisterWriteContext();

  if (!context) return;

  const { campaignName, endDate, startDate } = context.valueFilter;

  const dateRange: DateRange | undefined =
    startDate || endDate
      ? {
          from: startDate ? parseISO(startDate) : undefined,
          to: endDate ? parseISO(endDate) : undefined,
        }
      : undefined;

  const handleChangeDate = (range: DateRange | undefined) => {
    context?.setValueFilter((prev) => ({
      ...prev,
      startDate: range?.from ? range.from.toISOString() : '',
      endDate: range?.to ? range.to.toISOString() : '',
    }));
  };

  return (
    <Fragment>
      <div className="flex flex-col justify-end">
        <Label htmlFor="campaignName" className="font-bold mb-2 leading-5">
          Tên hoặc mã:
        </Label>
        <Input
          id="campaignName"
          type="text"
          placeholder="Tìm kiếm theo tên hoặc mã"
          value={campaignName}
          onChange={(e) => {
            context.setValueFilter((prev) => ({
              ...prev,
              campaignName: e.target.value,
            }));
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

export default UserFilterRegisterWriteComponent;
