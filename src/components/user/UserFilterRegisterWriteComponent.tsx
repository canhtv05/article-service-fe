import { Fragment } from 'react';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import FieldsSelect from '../FieldsSelect';
import { Status, StatusRegistration } from '@/enums';
import { useUserRegisterWriteContext } from '@/contexts/context/user/UserRegisterWriteContext';
import { parseISO } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '../DateRangePicker';

const UserFilterRegisterWriteComponent = () => {
  const context = useUserRegisterWriteContext();

  if (!context) return;

  const { end_date, name_or_id, start_date, status } = context.valueFilter;

  const dateRange: DateRange | undefined =
    start_date || end_date
      ? {
          from: start_date ? parseISO(start_date) : undefined,
          to: end_date ? parseISO(end_date) : undefined,
        }
      : undefined;

  const handleChangeDate = (range: DateRange | undefined) => {
    context?.setValueFilter((prev) => ({
      ...prev,
      start_date: range?.from ? range.from.toISOString() : '',
      end_date: range?.to ? range.to.toISOString() : '',
    }));
  };

  return (
    <Fragment>
      <div className="flex flex-col justify-end">
        <Label htmlFor="name_or_id" className="font-bold mb-2 leading-5">
          Tên hoặc mã:
        </Label>
        <Input
          id="name_or_id"
          type="text"
          placeholder="Tìm kiếm theo tên hoặc mã"
          value={name_or_id}
          onChange={(e) => {
            context.setValueFilter((prev) => ({
              ...prev,
              name_or_id: e.target.value,
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
            { label: 'Tất cả', value: Status.ALL },
            { label: 'Mở đăng ký', value: StatusRegistration.OPEN },
            { label: 'Đóng đăng ký', value: StatusRegistration.CLOSE },
          ]}
          label="Trạng thái"
          defaultValue={Status.ALL}
          value={status}
          setValue={(val) => {
            if (typeof val === 'string' && context && val !== status) {
              context.setValueFilter((prev) => ({
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

export default UserFilterRegisterWriteComponent;
