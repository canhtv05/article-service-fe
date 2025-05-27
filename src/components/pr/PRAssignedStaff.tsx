import { useSelector } from 'react-redux';

import PRStaffsProvider from '@/contexts/provider/pr/PRStaffsProvider';
import useViewport from '@/hooks/useViewport';
import PRFilterAssignArticleProvider from './PRFilterAssignArticleProvider';
import PRListNotAssignStaff from './PRListNotAssignStaff';
import { cn } from '@/lib/utils';

const PRAssignedStaff = () => {
  const { width } = useViewport();
  const open = useSelector((state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen);
  const maxWidth = open || width < 768 ? '100%' : `${width - 300}px`;

  return (
    <PRStaffsProvider>
      <div className="flex flex-col gap-4 pt-0 h-full">
        <PRFilterAssignArticleProvider />
        <div
          className={cn(
            'rounded-xl md:min-h-min flex-1 border w-full h-full transition-[max-width] duration-300 ease-in-out overflow-hidden',
          )}
          style={{ maxWidth }}
        >
          <PRListNotAssignStaff />
        </div>
      </div>
    </PRStaffsProvider>
  );
};

export default PRAssignedStaff;
