import { FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

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
import ConfirmDialog from '../ConfirmDialog';
import { AddOrUpdateTopicType } from '@/types';
import ConfirmDialogForm, { AlertDialogRef } from '../ConfirmDialogForm';
import { useFormErrors } from '@/hooks/useFormErrrors';
import { addOrUpdateTopicSchema } from '@/lib/validation';
import { toast } from 'sonner';
import { Notice, Status } from '@/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import axios from 'axios';

type AddOrUpdateTopic = AddOrUpdateTopicType & { id?: string; status?: string };

const PRModalAddOrUpdate = ({
  compTrigger,
  type,
  idUpdate,
  data,
}: {
  compTrigger: ReactNode;
  type: 'update' | 'add';
  idUpdate: string;
  data?: AddOrUpdateTopic;
}) => {
  const queryClient = useQueryClient();
  const dialogRef = useRef<AlertDialogRef>(null);
  const [open, setOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<AddOrUpdateTopic>({
    description: '',
    name: '',
    royaltyFee: undefined,
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleShowDialog = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dialogRef.current?.open();
  };

  const { errors, clearErrors, handleZodErrors } = useFormErrors<AddOrUpdateTopic>();

  const addOrUpdateMutation = useMutation({
    mutationKey: ['add-topic', 'update-topic'],
    mutationFn: async (data: AddOrUpdateTopic) => {
      const url = type === 'add' ? '/chu-de/them-chu-de' : `/chu-de/sua-chu-de/${data.id}`;
      return await httpRequest[type === 'add' ? 'post' : 'put'](url, data);
    },
    onSuccess: () => {
      toast.success(type === 'add' ? Notice.ADD_SUCCESS : Notice.UPDATE_SUCCESS);
      queryClient.invalidateQueries({ queryKey: ['/chu-de/danh-sach-chu-de'] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error(Status.ERROR);
      }
    },
  });

  const handleAddOrUpdate = useCallback(async () => {
    try {
      clearErrors();
      if (!formData) return;

      await addOrUpdateTopicSchema.parseAsync({ ...formData, id: idUpdate, status: data?.status });
      addOrUpdateMutation.mutate({ ...formData, id: idUpdate, status: data?.status });
      setOpen(false);
    } catch (error) {
      handleZodErrors(error);
    }
  }, [clearErrors, formData, idUpdate, data?.status, addOrUpdateMutation, handleZodErrors]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{compTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type === 'add' ? 'Thêm' : 'Chỉnh sửa'} chủ đề</DialogTitle>
          <DialogDescription>
            Thực hiện {type === 'add' ? 'thêm' : 'chỉnh sửa'} chủ đề tại đây. Nhấp vào lưu khi bạn hoàn tất.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleShowDialog} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="topic-name" className="text-right">
              Tên chủ đề
            </Label>
            <Input
              id="topic-name"
              value={formData?.name ?? ''}
              className={`col-span-3 ${errors.name ? 'border border-red-500' : ''}`}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="royalty" className="text-right">
              Nhuận bút
            </Label>
            <Input
              value={formData?.royaltyFee ?? ''}
              id="royalty"
              type="number"
              className={`col-span-3 ${errors.royaltyFee ? 'border border-red-500' : ''}`}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  royaltyFee: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Mô tả
            </Label>
            <Textarea
              value={formData?.description ?? ''}
              id="description"
              className={`col-span-3 max-h-[280px] ${errors.description ? 'border border-red-500' : ''}`}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        </form>
        <DialogFooter>
          <ConfirmDialog
            onContinue={handleAddOrUpdate}
            typeTitle={type === 'add' ? 'thêm' : 'chỉnh sửa'}
            triggerComponent={
              <Button type="submit" customize={'default'}>
                Lưu
              </Button>
            }
          ></ConfirmDialog>
          <ConfirmDialogForm typeTitle="chỉnh sửa" ref={dialogRef} onContinue={() => {}} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PRModalAddOrUpdate;
