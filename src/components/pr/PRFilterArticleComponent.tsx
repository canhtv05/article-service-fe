import { Fragment, useCallback, useContext } from 'react';

import { Label } from '../ui/label';

import FieldsSelect from '../FieldsSelect';
import { StatusArticle, StatusSend } from '@/enums';
import { PRListArticlesContext } from '@/contexts/context/pr/PRListArticlesContext';
import { useQuery } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import { Input } from '../ui/input';

type Campaign = {
  name: string;
};

type CampaignListResponse = Campaign[];

const PRFilterArticleComponent = () => {
  const articles = useContext(PRListArticlesContext);

  const { data } = useQuery({
    queryKey: ['/danh-sach-chu-de2'],
    queryFn: async () => {
      const response = await httpRequest.get('/chu-de/danh-sach-chu-de2');
      return response.data;
    },
  });

  const { data: campaigns } = useQuery<CampaignListResponse>({
    queryKey: ['/admin/bai-viet/danh-sach-bai-viet'],
    queryFn: async () => {
      const response = await httpRequest.get('/dot-bai-viet/danh-sach-dot-bai-viet');
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

  const mappedOptionCampaignName = useCallback(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      campaigns?.map((item: any) => ({
        value: item.id,
        label: item.name,
      })) ?? [],
    [campaigns],
  );

  if (!articles || !campaigns) return;

  const { assignerName, status, titleAndAuthorName, topicId, writingCampaignId } = articles.valueFilter;

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
        <Label htmlFor="assignerName" className="font-bold mb-2 leading-5">
          Tên người phân công:
        </Label>
        <Input
          id="assignerName"
          type="text"
          placeholder="Tìm kiếm theo tên người phân công"
          value={assignerName}
          onChange={(e) => {
            articles.setValueFilter((prev) => ({
              ...prev,
              assignerName: e.target.value,
            }));
          }}
        />
      </div>

      <div className="flex flex-col justify-end">
        <Label htmlFor="topicId" className="font-bold mb-2 leading-5">
          Chủ đề:
        </Label>
        <FieldsSelect
          id="topicId"
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
          placeholder="Chọn trạng thái"
          data={[
            { label: 'Đã gửi cho PR', value: StatusArticle.SendToPR },
            { label: 'Chưa gửi cho PR', value: StatusSend.NOT_SENT },
          ]}
          label="Trạng thái"
          value={status}
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
        <Label htmlFor="writingCampaignId" className="font-bold mb-2 leading-5">
          Đợt viết bài:
        </Label>
        <FieldsSelect
          id="writingCampaignId"
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

export default PRFilterArticleComponent;
