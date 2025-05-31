import { useSelector } from 'react-redux';

import useViewport from '@/hooks/useViewport';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';
import UserListArticlesProvider from '@/contexts/provider/user/UserListArticlesProvider';
import UserFilterListArticlesProvider from '@/components/user/UserFilterListArticlesProvider';
import UserListArticlesTableWithPagination from '@/components/user/UserListArticlesTableWithPagination';

const UserListArticles = () => {
  const { width } = useViewport();
  const open = useSelector((state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen);
  const maxWidth = open || width < 768 ? '100%' : `${width - 300}px`;

  return (
    <UserListArticlesProvider>
      <div className="flex flex-col gap-4 pt-0 h-full">
        <UserFilterListArticlesProvider />
        <div
          className={cn(
            'rounded-xl md:min-h-min flex-1 border w-full h-full transition-[max-width] duration-300 ease-in-out overflow-hidden',
          )}
          style={{ maxWidth }}
        >
          <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
            <div className="flex gap-3 items-center justify-between mb-10">
              <div className="flex gap-3 items-center">
                <List />
                <span className="text-foreground text-[18px]">Danh sách bài viết</span>
              </div>
            </div>
            <UserListArticlesTableWithPagination />
          </div>
        </div>
      </div>
    </UserListArticlesProvider>
  );
};

export default UserListArticles;
