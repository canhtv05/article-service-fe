import { ReactNode, useContext, useState } from 'react';
import _ from 'lodash';
import { toast } from 'sonner';

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

const PRModalAddOrUpdate = ({
  compTrigger,
  type,
  ma,
}: {
  compTrigger: ReactNode;
  type: 'update' | 'add';
  ma?: string;
}) => {
  const topics = useContext(PRTopicManagementContext);
  const [open, setOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ title?: boolean; royalty?: boolean; description?: boolean }>({});

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && topics) {
      if (type === 'update' && ma && topics.data) {
        const topic = topics.data.find((t) => t.ma === ma);
        if (topic) {
          topics.setDataAddOrUpdate({
            title: topic.topic_name,
            royalty: topic.royalty,
            description: topic.description,
          });
        }
      } else {
        topics.setDataAddOrUpdate({
          title: '',
          royalty: undefined,
          description: '',
        });
      }
    }
  };

  const validateData = () => {
    const { description, royalty, title } = topics?.dataAddOrUpdate ?? {};
    const newErrors: { title?: boolean; royalty?: boolean; description?: boolean } = {};

    if (_.isEmpty(title)) newErrors.title = true;
    if (_.isUndefined(royalty)) newErrors.royalty = true;
    if (_.isEmpty(description)) newErrors.description = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      if (newErrors.title) {
        toast.error('Vui lòng nhập tên chủ đề.', { id: 'title-error' });
      } else if (newErrors.royalty) {
        toast.error('Vui lòng nhập nhuận bút.', { id: 'royalty-error' });
      } else if (newErrors.description) {
        toast.error('Vui lòng nhập mô tả.', { id: 'description-error' });
      }

      return false;
    }

    setErrors({});
    return true;
  };

  const handleSave = () => {
    if (!validateData() || !topics) return;

    if (type === 'add') {
      topics.handleAdd();
    } else if (type === 'update' && ma) {
      topics.handleUpdate(ma, topics.dataAddOrUpdate);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{compTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type === 'add' ? 'Thêm' : 'Chỉnh sửa'} chủ đề</DialogTitle>
          <DialogDescription>
            Thực hiện {type === 'add' ? 'thêm' : 'chỉnh sửa'} chủ đề tại đây. Nhấp vào lưu khi bạn hoàn tất.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="topic-name" className="text-right">
              Tên chủ đề
            </Label>
            <Input
              id="topic-name"
              value={topics?.dataAddOrUpdate.title ?? ''}
              className={`col-span-3 ${errors.title ? 'border border-red-500' : ''}`}
              onChange={(e) => {
                topics?.setDataAddOrUpdate((prev) => ({
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
              value={topics?.dataAddOrUpdate.royalty ?? ''}
              type="number"
              className={`col-span-3 ${errors.royalty ? 'border border-red-500' : ''}`}
              onChange={(e) => {
                topics?.setDataAddOrUpdate((prev) => ({
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
              value={topics?.dataAddOrUpdate.description ?? ''}
              className={`col-span-3 max-h-[280px] ${errors.description ? 'border border-red-500' : ''}`}
              onChange={(e) => {
                topics?.setDataAddOrUpdate((prev) => ({
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
            typeTitle={type === 'add' ? 'thêm' : 'chỉnh sửa'}
            triggerComponent={
              <Button
                type="button"
                customize={'default'}
                onClick={(e) => {
                  if (!validateData()) {
                    e.preventDefault();
                    return;
                  }
                }}
              >
                Lưu
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PRModalAddOrUpdate;
