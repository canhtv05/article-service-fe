import { Fragment, useContext } from 'react';
import { PRTopicManagementContext } from '@/contexts/context/pr/PRTopicManagementContext';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import FieldsSelect from '../FieldsSelect';

const PRFilterTopicComponent = () => {
  const topics = useContext(PRTopicManagementContext);

  if (!topics) return;

  const { maxFee, minFee, name, status } = topics.valueFilter;

  return (
    <Fragment>
      <div className="flex flex-col justify-end">
        <Label htmlFor="topic_name" className="font-bold mb-2 leading-5">
          Tên chủ đề:
        </Label>
        <Input
          id="topic_name"
          type="text"
          placeholder="Nhập tên chủ đề"
          value={name}
          onChange={(e) => {
            topics.setValueFilter((prev) => ({
              ...prev,
              name: e.target.value,
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
          placeholder="-- Chọn trạng thái --"
          data={[
            { label: 'Hoạt động', value: 'ACTIVE' },
            { label: 'Không hoạt động', value: 'INACTIVE' },
          ]}
          label="Trạng thái"
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
            value={minFee ?? ''}
            onChange={(e) => {
              topics.setValueFilter((prev) => ({
                ...prev,
                minFee: e.target.value ? Number(e.target.value) : undefined,
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
            value={maxFee ?? ''}
            onChange={(e) => {
              topics.setValueFilter((prev) => ({
                ...prev,
                maxFee: e.target.value ? Number(e.target.value) : undefined,
              }));
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default PRFilterTopicComponent;
