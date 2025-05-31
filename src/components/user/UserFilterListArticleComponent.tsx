import { Fragment } from 'react';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import FieldsSelect from '../FieldsSelect';
import { Status, StatusArticle } from '@/enums';
import { parseISO } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '../DateRangePicker';
import { useUserListArticlesContext } from '@/contexts/context/user/UserListArticlesContext';

const UserFilterListArticleComponent = () => {
  const context = useUserListArticlesContext();

  if (!context) return;

  const { end_date, campaign_period, title, topic, start_date, status } = context.valueFilter;

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
        <Label htmlFor="title" className="font-bold mb-2 leading-5">
          Tiêu đề:
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="Tìm kiếm theo tiêu đề"
          value={title}
          onChange={(e) => {
            context.setValueFilter((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
        />
      </div>

      <div className="flex flex-col justify-end">
        <Label htmlFor="topic" className="font-bold mb-2 leading-5">
          Chủ đề:
        </Label>
        <Input
          id="topic"
          type="text"
          placeholder="Tìm kiếm theo chủ đề"
          value={topic}
          onChange={(e) => {
            context.setValueFilter((prev) => ({
              ...prev,
              topic: e.target.value,
            }));
          }}
        />
      </div>

      <div className="flex flex-col justify-end">
        <Label htmlFor="campaign_period" className="font-bold mb-2 leading-5">
          Đợt viết bài:
        </Label>
        <FieldsSelect
          id="campaign_period"
          placeholder="-- Chọn đợt viết bài --"
          data={[
            { label: 'Tháng 10 (01/10/2005 - 30/10/2005)', value: 'Tháng 10 (01/10/2005 - 30/10/2005)' },
            { label: 'Tháng 9 (08/09/2005 - 30/09/2005)', value: 'Tháng 9 (08/09/2005 - 30/09/2005)' },
          ]}
          label="Đợt viết bài"
          defaultValue={''}
          value={campaign_period}
          setValue={(val) => {
            if (typeof val === 'string' && context && val !== campaign_period) {
              context.setValueFilter((prev) => ({
                ...prev,
                campaign_period: val,
              }));
            }
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
            { label: StatusArticle.POSTED, value: StatusArticle.POSTED },
            { label: StatusArticle.NOT_POSTED, value: StatusArticle.NOT_POSTED },
            { label: StatusArticle.PENDING, value: StatusArticle.PENDING },
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
        <Label className="font-bold mb-2 leading-5">Ngày tạo:</Label>
        <DateRangePicker value={dateRange} onChange={handleChangeDate} />
      </div>
    </Fragment>
  );
};

export default UserFilterListArticleComponent;
