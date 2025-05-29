import { Fragment } from 'react';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import FieldsSelect from '../FieldsSelect';
import { DateRangePicker } from '../DateRangePicker';
import { DateRange } from 'react-day-picker';
import { parseISO } from 'date-fns';
import { useAdminApproveArticleContext } from '@/contexts/context/admin/AdminApproveArticleContext';

const AdminFilterApproveArticleComponent = () => {
  const approveArticle = useAdminApproveArticleContext();

  if (!approveArticle) return;

  const { campaign_period, end_date, start_date, topic_name, topic_name_and_author_name } = approveArticle.valueFilter;

  const dateRange: DateRange | undefined =
    start_date || end_date
      ? {
          from: start_date ? parseISO(start_date) : undefined,
          to: end_date ? parseISO(end_date) : undefined,
        }
      : undefined;

  const handleChangeDate = (range: DateRange | undefined) => {
    approveArticle?.setValueFilter((prev) => ({
      ...prev,
      start_date: range?.from ? range.from.toISOString() : '',
      end_date: range?.to ? range.to.toISOString() : '',
    }));
  };

  return (
    <Fragment>
      <div className="flex flex-col justify-end">
        <Label htmlFor="topic_name_and_author_name" className="font-bold mb-2 leading-5">
          Tiêu đề và tác giả:
        </Label>
        <Input
          id="topic_name_and_author_name"
          type="text"
          placeholder="Tìm kiếm theo tiêu đề và tác giả"
          value={topic_name_and_author_name}
          onChange={(e) => {
            approveArticle.setValueFilter((prev) => ({
              ...prev,
              topic_name_and_author_name: e.target.value,
            }));
          }}
        />
      </div>

      <div className="flex flex-col justify-end">
        <Label htmlFor="campaign_period" className="font-bold mb-2 leading-5">
          Tên đợt viết bài:
        </Label>
        <Input
          id="campaign_period"
          type="text"
          placeholder="Tìm kiếm theo tiêu đề và tác giả"
          value={campaign_period}
          onChange={(e) => {
            approveArticle.setValueFilter((prev) => ({
              ...prev,
              campaign_period: e.target.value,
            }));
          }}
        />
      </div>

      <div className="flex flex-col justify-end">
        <Label className="font-bold mb-2 leading-5">Ngày diễn ra đợt:</Label>
        <DateRangePicker value={dateRange} onChange={handleChangeDate} />
      </div>

      <div className="flex flex-col justify-end">
        <Label htmlFor="status" className="font-bold mb-2 leading-5">
          Chủ đề bài viết:
        </Label>
        <FieldsSelect
          id="status"
          placeholder="-- Chọn chủ đề --"
          data={[
            { label: 'Tất cả', value: 'ALL' },
            { label: 'Mở đăng ký', value: 'Mở đăng ký' },
            { label: 'Đóng đăng ký', value: 'Đóng đăng ký' },
          ]}
          label="Chủ đề"
          defaultValue={'ALL'}
          value={topic_name}
          setValue={(val) => {
            if (typeof val === 'string' && approveArticle && val !== topic_name) {
              approveArticle.setValueFilter((prev) => ({
                ...prev,
                topic_name: val,
              }));
            }
          }}
        />
      </div>
    </Fragment>
  );
};

export default AdminFilterApproveArticleComponent;
