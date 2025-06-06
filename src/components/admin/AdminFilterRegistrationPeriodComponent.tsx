import { Fragment, useContext } from 'react';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import FieldsSelect from '../FieldsSelect';
import { AdminRegistrationPeriodContext } from '@/contexts/context/admin/AdminRegistrationPeriodContext';
import { DateRangePicker } from '../DateRangePicker';
import { DateRange } from 'react-day-picker';
import { parseISO } from 'date-fns';

const AdminFilterRegistrationPeriodComponent = () => {
  const registrationPeriod = useContext(AdminRegistrationPeriodContext);

  if (!registrationPeriod) return;

  const { endDate, name, startDate, status } = registrationPeriod.valueFilter;

  const dateRange: DateRange | undefined =
    startDate || endDate
      ? {
          from: startDate ? parseISO(startDate) : undefined,
          to: endDate ? parseISO(endDate) : undefined,
        }
      : undefined;

  const handleChangeDate = (range: DateRange | undefined) => {
    registrationPeriod?.setValueFilter((prev) => ({
      ...prev,
      startDate: range?.from ? range.from.toISOString() : '',
      endDate: range?.to ? range.to.toISOString() : '',
    }));
  };

  return (
    <Fragment>
      <div className="flex flex-col justify-end">
        <Label htmlFor="name" className="font-bold mb-2 leading-5">
          Tìm kiếm theo tên:
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Tìm kiếm theo tên"
          value={name}
          onChange={(e) => {
            registrationPeriod.setValueFilter((prev) => ({
              ...prev,
              name: e.target.value,
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
          placeholder="-- Chọn Trạng thái --"
          data={[
            { label: 'Mở đăng ký', value: 'Open' },
            { label: 'Đóng đăng ký', value: 'NotOpen' },
          ]}
          label="Chủ đề"
          value={status}
          setValue={(val) => {
            if (typeof val === 'string' && registrationPeriod && val !== status) {
              registrationPeriod.setValueFilter((prev) => ({
                ...prev,
                status: val,
              }));
            }
          }}
        />
      </div>

      <div className="flex flex-col justify-end">
        <Label className="font-bold mb-2 leading-5">Ngày diễn ra đợt:</Label>
        <DateRangePicker value={dateRange} onChange={handleChangeDate} />
      </div>
    </Fragment>
  );
};

export default AdminFilterRegistrationPeriodComponent;
