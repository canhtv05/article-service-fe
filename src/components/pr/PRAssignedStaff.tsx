import PRStaffsProvider from '@/contexts/provider/pr/PRStaffsProvider';
import { useIsMobile } from '@/hooks';
import useViewport from '@/hooks/useViewport';
import PRFilterAssignArticleProvider from './PRFilterAssignArticleProvider';
import PRListNotAssignStaff from './PRListNotAssignStaff';

const PRAssignedStaff = () => {
  const { width } = useViewport();
  const isMobile = useIsMobile();

  return (
    <PRStaffsProvider>
      <div className="flex flex-col gap-4 pt-0 h-full">
        <PRFilterAssignArticleProvider />
        <div
          className="rounded-xl md:min-h-min flex-1 border w-full h-full"
          style={{
            width: isMobile ? '100%' : width - 300,
          }}
        >
          <PRListNotAssignStaff />
        </div>
      </div>
    </PRStaffsProvider>
  );
};

export default PRAssignedStaff;
