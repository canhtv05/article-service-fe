import { FormEvent, ReactElement, ReactNode, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from './ui/button';

const DialogCustom = ({
  triggerComponent,
  title,
  onContinue,
  component,
}: {
  triggerComponent: ReactNode;
  onContinue?: () => void;
  title: string;
  component?: ReactElement;
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openMain, setOpenMain] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setOpenConfirm(true);
  };

  const handleConfirm = () => {
    onContinue?.();
    setOpenConfirm(false);
    setOpenMain(false);
  };

  return (
    <>
      <Dialog open={openMain} onOpenChange={setOpenMain}>
        <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
        <DialogContent className="max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription />
            <form onSubmit={handleSubmit}>
              {component}
              <div className="flex mt-5 gap-3 justify-end">
                <DialogClose asChild>
                  <Button variant="outline">Hủy</Button>
                </DialogClose>
                <Button type="submit">Tiếp tục</Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogDescription />
            <DialogTitle>Bạn có chắc chắn muốn tiếp tục?</DialogTitle>
            <div className="mt-4 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setOpenConfirm(false)}>
                Hủy
              </Button>
              <Button onClick={handleConfirm}>Xác nhận</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogCustom;
