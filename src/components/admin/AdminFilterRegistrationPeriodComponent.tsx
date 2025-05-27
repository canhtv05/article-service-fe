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

  const { end_date, id_or_name, start_date, status } = registrationPeriod.valueFilter;

  const dateRange: DateRange | undefined =
    start_date || end_date
      ? {
          from: start_date ? parseISO(start_date) : undefined,
          to: end_date ? parseISO(end_date) : undefined,
        }
      : undefined;

  const handleChangeDate = (range: DateRange | undefined) => {
    registrationPeriod?.setValueFilter((prev) => ({
      ...prev,
      start_date: range?.from ? range.from.toISOString() : '',
      end_date: range?.to ? range.to.toISOString() : '',
    }));
  };

  return (
    <Fragment>
      <div className="flex flex-col justify-end">
        <Label htmlFor="title_and_author_name" className="font-bold mb-2 leading-5">
          Tìm kiếm theo tên hoặc mã:
        </Label>
        <Input
          id="title_and_author_name"
          type="text"
          placeholder="Tìm kiếm theo tên hoặc mã"
          value={id_or_name}
          onChange={(e) => {
            registrationPeriod.setValueFilter((prev) => ({
              ...prev,
              id_or_name: e.target.value,
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
            { label: 'Tất cả', value: 'ALL' },
            { label: 'Mở đăng ký', value: 'Mở đăng ký' },
            { label: 'Đóng đăng ký', value: 'Đóng đăng ký' },
          ]}
          label="Chủ đề"
          defaultValue={'ALL'}
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
