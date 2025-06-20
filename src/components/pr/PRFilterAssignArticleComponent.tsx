import { Fragment, useCallback, useContext } from 'react';

import { Label } from '../ui/label';
import FieldsSelect from '../FieldsSelect';
import { PRStaffsContext } from '@/contexts/context/pr/PRStaffsContext';
import { useQuery } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import { Input } from '../ui/input';

const PRFilterAssignArticleComponent = () => {
  const staffs = useContext(PRStaffsContext);

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

  if (!staffs) return;

  const { titleAndAuthorName, topicId } = staffs.valueFilter;

  return (
    <Fragment>
      <div className="flex flex-col justify-end w-full">
        <Label htmlFor="titleAndAuthorName" className="font-bold mb-2 leading-5">
          Tên tiêu đề và tên tác giả của bài viết:
        </Label>
        <Input
          id="titleAndAuthorName"
          type="text"
          placeholder="Tìm kiếm theo tiêu đề và tên tác giả của bài viết"
          value={titleAndAuthorName}
          onChange={(e) => {
            staffs.setValueFilter((prev) => ({
              ...prev,
              titleAndAuthorName: e.target.value,
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
            if (typeof val === 'string' && staffs && val !== topicId) {
              staffs.setValueFilter((prev) => ({
                ...prev,
                topicId: val,
              }));
            }
          }}
        />
      </div>
    </Fragment>
  );
};

export default PRFilterAssignArticleComponent;
