import { Funnel } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import FieldsSelect from './FieldsSelect';
import { Button } from './ui/button';

const DataFilters = () => {
  // handler filter
  // handle clear

  return (
    <div className="flex flex-col gap-4 bg-muted/50 rounded-xl shadow-md p-5">
      <div className="flex gap-3 items-center">
        <Funnel />
        <span className="text-foreground text-[18px]">Bộ lọc</span>
      </div>
      <div className="flex gap-4 mt-2 justify-between items-center">
        <div className="w-full max-w-xs">
          <Label htmlFor="email" className="font-bold mb-2">
            Email:
          </Label>
          <Input id="email" type="email" placeholder="Email" className="mt-0.5" />
        </div>
        <div className="w-full max-w-xs">
          <Label htmlFor="status" className="font-bold mb-2">
            Trạng thái:
          </Label>
          <FieldsSelect id="status" placeholder="Trạng thái" data={[{ label: 'Tất cả' }]} label="Chọn trạng thái" />
        </div>
        <div className="w-full max-w-xs flex justify-between items-end gap-5">
          <div>
            <Label htmlFor="nhuan-but" className="font-bold mb-2">
              Nhuận bút:
            </Label>
            <Input id="nhuan-but" type="number" placeholder="Từ" className="mt-0.5" />
          </div>
          <div>
            <Label htmlFor="den" className="font-bold mb-2"></Label>
            <Input id="den" type="number" placeholder="Đến" className="mt-0.5" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button>ok</Button>
        <Button>ok</Button>
      </div>
    </div>
  );
};

export default DataFilters;
