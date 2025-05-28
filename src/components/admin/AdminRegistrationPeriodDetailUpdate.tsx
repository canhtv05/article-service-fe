import { Pen } from 'lucide-react';
import { DateRangePicker } from '../DateRangePicker';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const AdminRegistrationPeriodDetailUpdate = () => {
  return (
    <div className="flex flex-col rounded-xl shadow-md p-5 text-foreground border">
      <div className="mb-10">Đợt 08/05/2005 - 20/05/2005</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col justify-end">
          <Label htmlFor="campaign_id" className="font-bold mb-2 leading-5">
            Mã đợt:
          </Label>
          <Input
            id="campaign_id"
            type="text"
            placeholder="Mã đợt"
            value={'550e8400-e29b-41d4-a716-446655440000'}
            disabled
          />
        </div>
        <div className="flex flex-col justify-end">
          <Label htmlFor="campaign_name" className="font-bold mb-2 leading-5">
            Tên đợt đăng ký
          </Label>
          <Input
            id="campaign_name"
            type="text"
            placeholder="Tên đợt đăng ký"
            value={'Đợt 01/05/2006 - 31/05/2006'}
            onChange={() => console.log(1)}
          />
        </div>
        <div className="flex flex-col justify-end">
          <Label className="font-bold mb-2 leading-5">Thời gian đăng ký:</Label>
          <DateRangePicker value={{ from: new Date(), to: new Date() }} onChange={() => console.log(1)} />
        </div>
        <div className="flex flex-col justify-end">
          <Label className="font-bold mb-2 leading-5">Thời gian:</Label>
          <DateRangePicker value={{ from: new Date(), to: new Date() }} onChange={() => console.log(1)} />
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button customize="default" className="!py-5 px-6 flex gap-2 rounded-full">
          <Pen />
          <span>Cập nhật</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminRegistrationPeriodDetailUpdate;
