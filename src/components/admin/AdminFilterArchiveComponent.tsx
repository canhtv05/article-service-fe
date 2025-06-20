import { Fragment } from 'react';

import { Label } from '../ui/label';
import { useAdminArchiveContext } from '@/contexts/context/admin/AdminArchiveContext';
import { Input } from '../ui/input';

const AdminFilterArchiveComponent = () => {
  const archive = useAdminArchiveContext();

  if (!archive) return;
  const { title, authorName, campaignName } = archive.valueFilter;

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
          Tên đợt viết bài:
        </Label>
        <Input
          id="campaignName"
          type="text"
          placeholder="Tìm kiếm Tên đợt viết bài"
          value={campaignName}
          onChange={(e) => {
            archive.setValueFilter((prev) => ({
              ...prev,
              campaignName: e.target.value,
            }));
          }}
        />
      </div>
    </Fragment>
  );
};

export default AdminFilterArchiveComponent;
