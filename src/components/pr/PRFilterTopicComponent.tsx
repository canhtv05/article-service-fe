import { Fragment, useContext } from 'react';
import { PRTopicManagementContext } from '@/contexts/context/pr/PRTopicManagementContext';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import FieldsSelect from '../FieldsSelect';
import { Status } from '@/enums';

const PRFilterTopicComponent = () => {
  const topics = useContext(PRTopicManagementContext);

  if (!topics) return;

  const { topic_name, from, to, status } = topics.valueFilter;

  return (
    <Fragment>
      <div className="flex flex-col justify-end">
        <Label htmlFor="topic_name" className="font-bold mb-2 leading-5">
          Tên chủ đề:
        </Label>
        <Input
          id="topic_name"
          type="text"
          placeholder="Nhập mã hoặc tên chủ đề"
          value={topic_name}
          onChange={(e) => {
            topics.setValueFilter((prev) => ({
              ...prev,
              topic_name: e.target.value,
            }));
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
            { label: 'Tất cả', value: Status.ALL },
            { label: 'Hoạt động', value: Status.ACTIVE },
            { label: 'Ngừng hoạt động', value: Status.INACTIVE },
          ]}
          label="Trạng thái"
          defaultValue={Status.ALL}
          value={status}
          setValue={(val) => {
            if (typeof val === 'string' && topics && val !== status) {
              topics.setValueFilter((prev) => ({
                ...prev,
                status: val,
              }));
            }
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="nhuan-but" className="font-bold mb-2 leading-5">
            Nhuận bút:
          </Label>
          <Input
            id="nhuan-but"
            type="number"
            placeholder="Từ"
            value={from ?? ''}
            onChange={(e) => {
              topics.setValueFilter((prev) => ({
                ...prev,
                from: e.target.value ? Number(e.target.value) : undefined,
              }));
            }}
          />
        </div>
        <div>
          <Label htmlFor="den" className="font-bold mb-2 leading-5 invisible">
            Đến
          </Label>
          <Input
            id="den"
            type="number"
            placeholder="Đến"
            value={to ?? ''}
            onChange={(e) => {
              topics.setValueFilter((prev) => ({
                ...prev,
                to: e.target.value ? Number(e.target.value) : undefined,
              }));
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default PRFilterTopicComponent;
