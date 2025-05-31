import { Fragment } from 'react';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import FieldsSelect from '../FieldsSelect';
import { useAdminArchiveContext } from '@/contexts/context/admin/AdminArchiveContext';

const AdminFilterArchiveComponent = () => {
  const archive = useAdminArchiveContext();

  if (!archive) return;

  const { author_name, campaign_period, id_author, title, topic } = archive.valueFilter;

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
        <Label htmlFor="id_author" className="font-bold mb-2 leading-5">
          Mã giảng viên:
        </Label>
        <Input
          id="id_author"
          type="text"
          placeholder="Tìm kiếm mã giảng viên"
          value={id_author}
          onChange={(e) => {
            archive.setValueFilter((prev) => ({
              ...prev,
              id_author: e.target.value,
            }));
          }}
        />
      </div>

      <div className="flex flex-col justify-end">
        <Label htmlFor="author_name" className="font-bold mb-2 leading-5">
          Tên giảng viên:
        </Label>
        <Input
          id="author_name"
          type="text"
          placeholder="Tìm kiếm tên giảng viên"
          value={author_name}
          onChange={(e) => {
            archive.setValueFilter((prev) => ({
              ...prev,
              author_name: e.target.value,
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
            if (typeof val === 'string' && archive && val !== campaign_period) {
              archive.setValueFilter((prev) => ({
                ...prev,
                campaign_period: val,
              }));
            }
          }}
        />
      </div>

      <div className="flex flex-col justify-end">
        <Label htmlFor="topic" className="font-bold mb-2 leading-5">
          Chủ đề bài viết:
        </Label>
        <FieldsSelect
          id="topic"
          placeholder="-- Chọn chủ đề bài viết --"
          data={[
            { label: 'Công nghệ', value: 'Công nghệ' },
            { label: 'Bền vững', value: 'Bền vững' },
            { label: 'Nông nghiệp', value: 'Nông nghiệp' },
          ]}
          label="Đợt viết bài"
          defaultValue={''}
          value={topic}
          setValue={(val) => {
            if (typeof val === 'string' && archive && val !== topic) {
              archive.setValueFilter((prev) => ({
                ...prev,
                topic: val,
              }));
            }
          }}
        />
      </div>
    </Fragment>
  );
};

export default AdminFilterArchiveComponent;
