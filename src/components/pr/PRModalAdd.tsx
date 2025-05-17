import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '../ui/textarea';

const PRModalAdd = ({ compTrigger }: { compTrigger: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{compTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm chủ đề</DialogTitle>
          <DialogDescription>Thực hiện thêm chủ đề tại đây. Nhấp vào lưu khi bạn hoàn tất.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="topic-name" className="text-right">
              Tên chủ đề
            </Label>
            <Input id="topic-name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="royalty" className="text-right">
              Nhuận bút
            </Label>
            <Input id="royalty" value="@peduarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Mô tả
            </Label>
            <Textarea id="description" value="@peduarte" className="col-span-3 max-h-[280px]" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Lưu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PRModalAdd;
