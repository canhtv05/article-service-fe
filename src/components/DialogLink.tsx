import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DialogLinkProps } from '@/types';

function DialogLink({ children, title, outline = false, open }: DialogLinkProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={`bg-card text-card-foreground w-[80vw]
          ${outline ? 'border-2 border-border' : 'border-none'}
          rounded-lg font-geist md:w-[70%] w-full
        `}
      >
        <DialogHeader className="border-b-1 border-foreground/20 py-2">
          <DialogTitle className="text-lg font-semibold text-foreground">{title}</DialogTitle>
          <DialogDescription className="sr-only">Dialog for viewing article details</DialogDescription>
        </DialogHeader>
        <div className="px-4 overflow-auto max-h-[80vh]">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(DialogLink);
