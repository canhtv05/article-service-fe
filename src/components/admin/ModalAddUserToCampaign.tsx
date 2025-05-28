import { Search } from 'lucide-react';
import { useState } from 'react';

import DialogLink from '../DialogLink';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import AddUserToCampaign from './AddUserToCampaign';

const ModalAddUserToCampaign = () => {
  const [name, setName] = useState<string>('');
  return (
    <DialogLink open={true} title="Thêm giảng viên vào đợt viết bài" outline>
      <div className="flex gap-2">
        <Input
          id="name"
          type="text"
          placeholder="Nhập tên giảng viên"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Button customize={'default'}>
          <Search />
        </Button>
      </div>
      <div className="mt-5">
        <AddUserToCampaign />
      </div>
    </DialogLink>
  );
};

export default ModalAddUserToCampaign;
