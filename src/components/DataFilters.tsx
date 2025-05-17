import { Funnel, RefreshCw, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import FieldsSelect from './FieldsSelect';
import { Button } from './ui/button';

const DataFilters = () => {
  return (
    <div className="flex flex-col gap-4 bg-muted/50 rounded-xl shadow-sm p-5 text-foreground border">
      <div className="flex gap-3 items-center">
        <Funnel />
        <span className="text-foreground text-[18px]">Bộ lọc</span>
      </div>

      {/* Grid 3 cột chính */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 w-full">
        {/* Email */}
        <div className="flex flex-col">
          <Label htmlFor="email" className="font-bold mb-2">
            Email:
          </Label>
          <Input id="email" type="email" placeholder="Email" />
        </div>

        {/* Trạng thái */}
        <div className="flex flex-col">
          <Label htmlFor="status" className="font-bold mb-2">
            Trạng thái:
          </Label>
          <FieldsSelect
            id="status"
            placeholder="Chọn trạng thái"
            data={[{ label: 'Tất cả' }, { label: 'Hoạt động' }, { label: 'Ngừng hoạt động' }]}
            label="Trạng thái"
            defaultValue="Tất cả"
          />
        </div>

        {/* Nhuận bút (từ - đến) */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="nhuan-but" className="font-bold mb-2">
              Nhuận bút:
            </Label>
            <Input id="nhuan-but" type="number" placeholder="Từ" />
          </div>
          <div>
            <Label htmlFor="den" className="font-bold mb-2 invisible">
              Đến
            </Label>
            <Input id="den" type="number" placeholder="Đến" />
          </div>
        </div>
      </div>

      {/* Nút hành động */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <Button customize="rounded" className="!py-5 px-6 flex gap-2">
          <Search />
          <span>Tìm kiếm</span>
        </Button>
        <Button customize="rounded" className="!py-5 px-6 flex gap-2">
          <RefreshCw />
          <span>Làm mới</span>
        </Button>
      </div>
    </div>
  );
};

export default DataFilters;
