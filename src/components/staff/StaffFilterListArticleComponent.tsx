import { Fragment, useContext } from 'react';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import FieldsSelect from '../FieldsSelect';
import { StatusSend } from '@/enums';
import { StaffListArticlesContext } from '@/contexts/context/staff/StaffListArticlesContext';

const StaffFilterListArticleComponent = () => {
  const articles = useContext(StaffListArticlesContext);

  if (!articles) return;

  const { campaign_period, status, topic_name, title_and_author_name } = articles.valueFilter;

  return (
    <Fragment>
      <div className="flex flex-col justify-end">
        <Label htmlFor="title_and_author_name" className="font-bold mb-2 leading-5">
          Tên tiêu đề và tên tác giả của bài viết:
        </Label>
        <Input
          id="title_and_author_name"
          type="text"
          placeholder="Tìm kiếm theo tiêu đề và tên tác giả của bài viết"
          value={title_and_author_name}
          onChange={(e) => {
            articles.setValueFilter((prev) => ({
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
            if (typeof val === 'string' && articles && val !== topic_name) {
              articles.setValueFilter((prev) => ({
                ...prev,
                topic_name: val,
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
            { label: 'Tất cả', value: StatusSend.ALL },
            { label: 'Đã gửi cho PR', value: StatusSend.SENT },
            { label: 'Chưa gửi cho PR', value: StatusSend.NOT_SENT },
          ]}
          label="Trạng thái"
          defaultValue={StatusSend.ALL}
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
            if (typeof val === 'string' && articles && val !== campaign_period) {
              articles.setValueFilter((prev) => ({
                ...prev,
                campaign_period: val,
              }));
            }
          }}
        />
      </div>
    </Fragment>
  );
};

export default StaffFilterListArticleComponent;
