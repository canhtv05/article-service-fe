import { ReactNode } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

const ConfirmDialog = ({
  triggerComponent,
  typeTitle,
  onContinue,
}: {
  triggerComponent: ReactNode;
  typeTitle: 'thêm' | 'chỉnh sửa' | 'xóa' | 'chuyển đổi trạng thái' | 'phân công' | 'mở đăng ký' | 'đóng đăng ký';
  onContinue: VoidFunction;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{triggerComponent}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn {typeTitle} không?</AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            Không thể hoàn tác hành động này. Thao tác này sẽ {typeTitle} của bạn{' '}
            {typeTitle === 'xóa' ? 'khỏi ' : 'vào '}
            máy chủ của chúng tôi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue} className={cn(buttonVariants({ customize: 'default' }))}>
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
