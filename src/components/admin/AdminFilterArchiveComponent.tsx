import { Fragment } from 'react';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import FieldsSelect from '../FieldsSelect';
import { useAdminArchiveContext } from '@/contexts/context/admin/AdminArchiveContext';
import { httpRequest } from '@/utils/httpRequest';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

type FieldsSelectType = {
  label: string;
  value: string;
};

type Campaign = {
  name: string;
};

type CampaignListResponse = Campaign[];

const AdminFilterArchiveComponent = () => {
  const archive = useAdminArchiveContext();

  const { data, error } = useQuery<CampaignListResponse>({
    queryKey: ['/admin/bai-viet/danh-sach-bai-viet'],
    queryFn: async () => {
      const response = await httpRequest.get('/dot-bai-viet/danh-sach-dot-bai-viet');
      return response.data;
    },
  });

  if (!archive) return;
  const { title, authorName, campaignName } = archive.valueFilter;

  const listCampaignName: FieldsSelectType[] = data
    ? Array.from(new Set(data.filter((c) => !!c.name).map((d) => d.name as string))).map((name) => ({
        label: name,
        value: name,
      }))
    : [];

  if (error) {
    toast.error('Có lỗi xảy ra');
    return;
  }

  return (
    <Fragment>
      <div className="flex flex-col justify-end">
        <Label htmlFor="title" className="font-bold mb-2 leading-5">
          Tiêu đề bài viết:
        </Label>
        <Input
          id="title"
          type="text"
          placeholder="Tìm kiếm tiêu đề bài viết"
          value={title}
          onChange={(e) => {
            archive.setValueFilter((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
        />
      </div>

      <div className="flex flex-col justify-end">
        <Label htmlFor="authorName" className="font-bold mb-2 leading-5">
          Tên giảng viên:
        </Label>
        <Input
          id="authorName"
          type="text"
          placeholder="Tìm kiếm tên giảng viên"
          value={authorName}
          onChange={(e) => {
            archive.setValueFilter((prev) => ({
              ...prev,
              authorName: e.target.value,
            }));
          }}
        />
      </div>

      <div className="flex flex-col justify-end">
        <Label htmlFor="campaignName" className="font-bold mb-2 leading-5">
          Đợt viết bài:
        </Label>
        <FieldsSelect
          id="campaignName"
          placeholder="-- Chọn đợt viết bài --"
          data={listCampaignName}
          label="Đợt viết bài"
          defaultValue={''}
          value={campaignName}
          setValue={(val) => {
            if (typeof val === 'string' && archive && val !== campaignName) {
              archive.setValueFilter((prev) => ({
                ...prev,
                campaignName: val,
              }));
            }
          }}
        />
      </div>
    </Fragment>
  );
};

export default AdminFilterArchiveComponent;
