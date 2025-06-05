import { Fragment } from 'react';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { DateRangePicker } from '../DateRangePicker';
import { DateRange } from 'react-day-picker';
import { parseISO } from 'date-fns';
import { useAdminApproveArticleContext } from '@/contexts/context/admin/AdminApproveArticleContext';

const AdminFilterApproveArticleComponent = () => {
  const approveArticle = useAdminApproveArticleContext();

  if (!approveArticle) return;

  const { campaignName, endData, startDate, titleAndAuthorName } = approveArticle.valueFilter;

  const dateRange: DateRange | undefined =
    startDate || endData
      ? {
          from: startDate ? parseISO(startDate) : undefined,
          to: endData ? parseISO(endData) : undefined,
        }
      : undefined;

  const handleChangeDate = (range: DateRange | undefined) => {
    approveArticle?.setValueFilter((prev) => ({
      ...prev,
      startDate: range?.from ? range.from.toISOString() : '',
      endData: range?.to ? range.to.toISOString() : '',
    }));
  };

  return (
    <Fragment>
      <div className="flex flex-col justify-end">
        <Label htmlFor="authorName title" className="font-bold mb-2 leading-5">
          Tiêu đề và tác giả:
        </Label>
        <Input
          id="authorName title"
          type="text"
          placeholder="Tìm kiếm theo tiêu đề và tác giả"
          value={titleAndAuthorName}
          onChange={(e) => {
            approveArticle.setValueFilter((prev) => ({
              ...prev,
              titleAndAuthorName: e.target.value,
            }));
          }}
        />
      </div>

      <div className="flex flex-col justify-end">
        <Label htmlFor="campaignName" className="font-bold mb-2 leading-5">
          Tên đợt viết bài:
        </Label>
        <Input
          id="campaignName"
          type="text"
          placeholder="Tìm kiếm theo tiêu đề và tác giả"
          value={campaignName}
          onChange={(e) => {
            approveArticle.setValueFilter((prev) => ({
              ...prev,
              campaignName: e.target.value,
            }));
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

export default AdminFilterApproveArticleComponent;
