import DataFilters from '@/components/DataFilters';
import PRListTopics from '@/components/pr/PRListTopics';

const PRTopicManagement = () => {
  return (
    <div className="flex flex-col gap-4 pt-0 h-full">
      <DataFilters />
      <div className="rounded-xl md:min-h-min flex-1 border">
        <PRListTopics />
      </div>
    </div>
  );
};

export default PRTopicManagement;
