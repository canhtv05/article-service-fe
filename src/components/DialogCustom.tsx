import { ReactElement, ReactNode } from 'react';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button, buttonVariants } from './ui/button';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';

const DialogCustom = ({
  triggerComponent,
  title,
  onContinue,
  component,
}: {
  triggerComponent: ReactNode;
  onContinue: VoidFunction;
  title: string;
  component?: ReactElement;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <Separator orientation="horizontal" className="my-2 h-4" />
          <DialogDescription className="text-[15px]">{component}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button onClick={onContinue} className={cn(buttonVariants({ customize: 'default' }))}>
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCustom;
