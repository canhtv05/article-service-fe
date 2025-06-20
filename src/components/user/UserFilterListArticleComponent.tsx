import { Fragment, useCallback } from 'react';

import { Label } from '../ui/label';
import FieldsSelect from '../FieldsSelect';
import { StatusArticle } from '@/enums';
import { parseISO } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '../DateRangePicker';
import { useUserListArticlesContext } from '@/contexts/context/user/UserListArticlesContext';
import { useQuery } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import { Input } from '../ui/input';

type Campaign = {
  name: string;
};

type CampaignListResponse = Campaign[];

const UserFilterListArticleComponent = () => {
  const context = useUserListArticlesContext();

  const { data: campaigns } = useQuery<CampaignListResponse>({
    queryKey: ['/admin/bai-viet/danh-sach-bai-viet'],
    queryFn: async () => {
      const response = await httpRequest.get('/dot-bai-viet/danh-sach-dot-bai-viet');
      return response.data;
    },
  });

  const mappedOptionCampaignName = useCallback(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      campaigns?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })) ?? [],
    [campaigns],
  );

  if (!context) return;

  const { campaignId, endDate, startDate, title, topicName, status } = context.valueFilter;

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
        <Label htmlFor="topicName" className="font-bold mb-2 leading-5">
          Chủ đề:
        </Label>
        <Input
          id="topicName"
          type="text"
          placeholder="Tìm kiếm theo chủ đề"
          value={topicName}
          onChange={(e) => {
            context.setValueFilter((prev) => ({
              ...prev,
              topicName: e.target.value,
            }));
          }}
        />
      </div>

      <div className="flex flex-col justify-end">
        <Label htmlFor="campaignId" className="font-bold mb-2 leading-5">
          Đợt viết bài:
        </Label>
        <FieldsSelect
          id="campaignId"
          placeholder="-- Chọn đợt viết bài --"
          data={mappedOptionCampaignName()}
          label="Đợt viết bài"
          defaultValue={''}
          value={campaignId}
          setValue={(val) => {
            if (typeof val === 'string' && context && val !== campaignId) {
              context.setValueFilter((prev) => ({
                ...prev,
                campaignId: val,
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
            { label: StatusArticle.POSTED, value: StatusArticle.POSTED },
            { label: StatusArticle.NOT_POSTED, value: StatusArticle.NOT_POSTED },
            { label: StatusArticle.PENDING, value: StatusArticle.PENDING },
            { label: StatusArticle.INACTIVE, value: StatusArticle.INACTIVE },
            { label: StatusArticle.SendToPR, value: StatusArticle.SendToPR },
            { label: StatusArticle.APPROVED, value: StatusArticle.APPROVED },
          ]}
          label="Trạng thái"
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
