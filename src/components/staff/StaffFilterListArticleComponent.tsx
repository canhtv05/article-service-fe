import { Fragment, useCallback, useContext } from 'react';

import { Label } from '../ui/label';
import FieldsSelect from '../FieldsSelect';
import { StaffListArticlesContext } from '@/contexts/context/staff/StaffListArticlesContext';
import { Input } from '../ui/input';
import { useQuery } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';

type Campaign = {
  name: string;
};

type CampaignListResponse = Campaign[];

const StaffFilterListArticleComponent = () => {
  const articles = useContext(StaffListArticlesContext);

  const { data } = useQuery({
    queryKey: ['/danh-sach-chu-de2'],
    queryFn: async () => {
      const response = await httpRequest.get('/chu-de/danh-sach-chu-de2');
      return response.data;
    },
  });

  const mappedOptions = useCallback(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })) ?? [],
    [data],
  );

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

  if (!articles) return;

  const { status, titleAndAuthorName, topicId, writingCampaignId } = articles.valueFilter;

  return (
    <Fragment>
      <div className="flex flex-col justify-end">
        <Label htmlFor="titleAndAuthorName" className="font-bold mb-2 leading-5">
          Tên tiêu đề và tên tác giả của bài viết:
        </Label>
        <Input
          id="titleAndAuthorName"
          type="text"
          placeholder="Tìm kiếm theo tiêu đề và tên tác giả của bài viết"
          value={titleAndAuthorName}
          onChange={(e) => {
            articles.setValueFilter((prev) => ({
              ...prev,
              titleAndAuthorName: e.target.value,
            }));
          }}
        />
      </div>

      <div className="flex flex-col justify-end">
        <Label htmlFor="topic_name" className="font-bold mb-2 leading-5">
          Chủ đề:
        </Label>
        <FieldsSelect
          id="topic_name"
          placeholder="-- Chọn chủ đề --"
          data={mappedOptions()}
          label="Chủ đề"
          value={topicId}
          setValue={(val) => {
            if (typeof val === 'string' && articles && val !== topicId) {
              articles.setValueFilter((prev) => ({
                ...prev,
                topicId: val,
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
            { label: 'Đã phê duyệt', value: 'Approved' },
            { label: 'Từ chối', value: 'Inactive' },
            { label: 'Đã gửi cho PR', value: 'SendToPR' },
            { label: 'Đã đăng', value: 'Published' },
          ]}
          label="Trạng thái"
          value={status ?? undefined}
          setValue={(val) => {
            if (typeof val === 'string' && articles && val !== status) {
              articles.setValueFilter((prev) => ({
                ...prev,
                status: val,
              }));
            }
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
          data={mappedOptionCampaignName()}
          label="Đợt viết bài"
          defaultValue={''}
          value={writingCampaignId}
          setValue={(val) => {
            if (typeof val === 'string' && articles && val !== writingCampaignId) {
              articles.setValueFilter((prev) => ({
                ...prev,
                writingCampaignId: val,
              }));
            }
          }}
        />
      </div>
    </Fragment>
  );
};

export default StaffFilterListArticleComponent;
