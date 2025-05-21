import PRFilterProvider from '@/components/pr/PRFilterProvider';
import PRListTopics from '@/components/pr/PRListTopics';
import PRTopicManagementProvider from '@/contexts/provider/pr/PRTopicManagementProvider';

const PRTopicManagement = () => {
  return (
    <PRTopicManagementProvider>
      <div className="flex flex-col gap-4 pt-0 h-full">
        <PRFilterProvider />
        <div className="rounded-xl md:min-h-min flex-1 border">
          <PRListTopics />
        </div>
      </div>
    </PRTopicManagementProvider>
  );
};

export default PRTopicManagement;
