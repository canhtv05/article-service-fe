import { List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import StatusBadge from '@/components/StatusBadge';
import { StatusRegistration } from '@/enums';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const technologies = [
  { name: 'react', label: 'React' },
  { name: 'next', label: 'Next' },
  { name: 'node', label: 'Node' },
  { name: 'remix', label: 'Remix' },
];

const UserRegisterWriteDetail = () => {
  const navigate = useNavigate();
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
      <div className="flex gap-3 items-center justify-between mb-10">
        <div className="flex gap-3 items-center">
          <List />
          <span className="text-foreground text-[18px]">Đăng ký viết bài</span>
          <StatusBadge status={StatusRegistration.OPEN} />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col justify-end">
          <Label htmlFor="id" className="font-bold mb-2 leading-5">
            Mã đợt:
          </Label>
          <Input id="id" value={'c4d5e6f7-a8b9-7c01-d2e3-f4a5b6c7d8e9'} disabled />
        </div>

        <div className="flex flex-col justify-end">
          <Label htmlFor="name" className="font-bold mb-2 leading-5">
            Tên đợt:
          </Label>
          <Input id="name" value={'c4d5e6f7-a8b9-7c01-d2e3-f4a5b6c7d8e9'} disabled />
        </div>
      </div>

      <div>
        <Label className="font-semibold">Chủ đề:</Label>
        <p className="mt-2 text-sm text-muted-foreground">Đã chọn: {selectedTechnologies.length} chủ đề</p>

        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedTechnologies(technologies.map((tech) => tech.name))}
          >
            Chọn hết
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSelectedTechnologies([])}>
            Bỏ chọn hết
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-3 border p-4 rounded-md">
          {technologies.map(({ name, label }) => {
            const isChecked = selectedTechnologies.includes(name);

            return (
              <label
                key={name}
                htmlFor={name}
                className="flex items-center gap-2 p-3 bg-ring/20 rounded-md cursor-pointer break-words"
              >
                <Checkbox
                  id={name}
                  value={name}
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTechnologies((prev) => [...prev, name]);
                    } else {
                      setSelectedTechnologies((prev) => prev.filter((tech) => tech !== name));
                    }
                  }}
                />
                <span className="text-sm font-medium leading-snug break-words overflow-hidden">{label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="default" className="rounded-full" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
        <Button customize="default" className="rounded-full" disabled={selectedTechnologies.length <= 1}>
          Lưu đăng ký
        </Button>
      </div>
    </div>
  );
};

export default UserRegisterWriteDetail;
