import { Fragment, useContext } from 'react';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import FieldsSelect from '../FieldsSelect';
import { PRStaffsContext } from '@/contexts/context/pr/PRStaffsContext';

const PRFilterAssignArticleComponent = () => {
  const staffs = useContext(PRStaffsContext);

  if (!staffs) return;

  const { topic_name, title_and_author_name } = staffs.valueFilter;

  return (
    <Fragment>
      <div className="flex flex-col justify-end w-full">
        <Label htmlFor="title_and_author_name" className="font-bold mb-2 leading-5">
          Tên tiêu đề và tên tác giả của bài viết:
        </Label>
        <Input
          id="title_and_author_name"
          type="text"
          placeholder="Tìm kiếm theo tiêu đề và tên tác giả của bài viết"
          value={title_and_author_name}
          onChange={(e) => {
            staffs.setValueFilter((prev) => ({
              ...prev,
              title_and_author_name: e.target.value,
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
          data={[
            { label: 'Công nghệ', value: 'Công nghệ' },
            { label: 'Bền vững', value: 'Bền vững' },
            { label: 'Nông nghiệp', value: 'Nông nghiệp' },
          ]}
          label="Chủ đề"
          defaultValue={''}
          value={topic_name}
          setValue={(val) => {
            if (typeof val === 'string' && staffs && val !== topic_name) {
              staffs.setValueFilter((prev) => ({
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

export default PRFilterAssignArticleComponent;
