import { List, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import PRTableWithPagination from './PRTableWithPagination';
import PRModalAdd from './PRModalAdd';

const PRListTopics = () => {
  return (
    <div className="flex flex-col gap-4 bg-muted/50 rounded-xl shadow-md p-5 text-foreground h-full">
      <div className="flex gap-3 items-center justify-between mb-10">
        <div className="flex gap-3 items-center">
          <List />
          <span className="text-foreground text-[18px]">Danh sách chủ đề</span>
        </div>
        <PRModalAdd
          compTrigger={
            <Button customize={'rounded'} className="py-5">
              <Plus />
              Thêm chủ đề
            </Button>
          }
        />
      </div>
      <PRTableWithPagination />
    </div>
  );
};

export default PRListTopics;
