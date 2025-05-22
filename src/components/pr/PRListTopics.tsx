import { List, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import PRTopicTableWithPagination from './PRTopicTableWithPagination';
import PRModalAddOrUpdate from './PRModalAddOrUpdate';

const PRListArticles = () => {
  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
      <div className="flex gap-3 items-center justify-between mb-10">
        <div className="flex gap-3 items-center">
          <List />
          <span className="text-foreground text-[18px]">Danh sách chủ đề</span>
        </div>
        <PRModalAddOrUpdate
          type="add"
          compTrigger={
            <Button customize={'default'} className="py-5 rounded-full">
              <Plus />
              Thêm chủ đề
            </Button>
          }
        />
      </div>
      <PRTopicTableWithPagination />
    </div>
  );
};

export default PRListArticles;
