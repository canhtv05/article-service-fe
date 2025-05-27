import { useSelector } from 'react-redux';

import PRFilterProvider from '@/components/pr/PRFilterTopicProvider';
import PRListTopics from '@/components/pr/PRListTopics';
import PRTopicManagementProvider from '@/contexts/provider/pr/PRTopicManagementProvider';
import useViewport from '@/hooks/useViewport';
import { cn } from '@/lib/utils';

const PRTopicManagement = () => {
  const { width } = useViewport();
  const open = useSelector((state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen);
  const maxWidth = open || width < 768 ? '100%' : `${width - 300}px`;

  return (
    <PRTopicManagementProvider>
      <div className="flex flex-col gap-4 pt-0 h-full">
        <PRFilterProvider />
        <div
          className={cn(
            'rounded-xl md:min-h-min flex-1 border w-full h-full transition-[max-width] duration-300 ease-in-out overflow-hidden',
          )}
          style={{ maxWidth }}
        >
          <PRListTopics />
        </div>
      </div>
    </PRTopicManagementProvider>
  );
};

export default PRTopicManagement;
