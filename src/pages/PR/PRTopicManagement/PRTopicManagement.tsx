import PRFilterProvider from '@/components/pr/PRFilterTopicProvider';
import PRListTopics from '@/components/pr/PRListTopics';
import PRTopicManagementProvider from '@/contexts/provider/pr/PRTopicManagementProvider';
import { useIsMobile } from '@/hooks';
import useViewport from '@/hooks/useViewport';

const PRTopicManagement = () => {
  const { width } = useViewport();
  const isMobile = useIsMobile();

  return (
    <PRTopicManagementProvider>
      <div className="flex flex-col gap-4 pt-0 h-full">
        <PRFilterProvider />
        <div
          className="rounded-xl md:min-h-min flex-1 border"
          style={{
            width: isMobile ? '100%' : width - 300,
          }}
        >
          <PRListTopics />
        </div>
      </div>
    </PRTopicManagementProvider>
  );
};

export default PRTopicManagement;
