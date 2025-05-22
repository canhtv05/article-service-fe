import { List } from 'lucide-react';
import PRArticleTableWithPagination from './PRArticleTableWithPagination';

const PRListTopics = () => {
  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
      <div className="flex gap-3 items-center justify-between mb-10">
        <div className="flex gap-3 items-center">
          <List />
          <span className="text-foreground text-[18px]">Danh sách bài viết</span>
        </div>
      </div>
      <PRArticleTableWithPagination />
    </div>
  );
};

export default PRListTopics;
