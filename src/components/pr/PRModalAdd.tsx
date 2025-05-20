import { ReactNode, useContext, useState } from 'react';

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
import { PRTopicManagementContext } from '@/contexts/context/pr/PRTopicManagementContext';
import ConfirmDialog from '../ConfirmDialog';

const PRModalAdd = ({ compTrigger }: { compTrigger: ReactNode }) => {
  const topics = useContext(PRTopicManagementContext);
  const [open, setOpen] = useState<boolean>(false);

  const handleSave = () => {
    if (!topics) return;
    topics.handleAdd();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Input
              id="topic-name"
              value={topics?.dataAdd.title ?? ''}
              className="col-span-3"
              onChange={(e) => {
                topics?.setDataAdd((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="royalty" className="text-right">
              Nhuận bút
            </Label>
            <Input
              id="royalty"
              value={topics?.dataAdd.royalty ?? ''}
              type="number"
              className="col-span-3"
              onChange={(e) => {
                topics?.setDataAdd((prev) => ({
                  ...prev,
                  royalty: e.target.value ? Number(e.target.value) : undefined,
                }));
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Mô tả
            </Label>
            <Textarea
              id="description"
              value={topics?.dataAdd.description ?? ''}
              className="col-span-3 max-h-[280px]"
              onChange={(e) => {
                topics?.setDataAdd((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <ConfirmDialog
            onContinue={handleSave}
            typeTitle="thêm"
            triggerComponent={<Button type="button">Lưu</Button>}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PRModalAdd;
