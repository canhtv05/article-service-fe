import AdminApproveArticleWithPagination from '@/components/admin/AdminApproveArticleWithPagination';
import AdminFilterApproveArticleProvider from '@/components/admin/AdminFilterApproveArticleProvider';
import AdminApproveArticleProvider from '@/contexts/provider/admin/AdminApproveArticleProvider';
import useViewport from '@/hooks/useViewport';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';
import { useSelector } from 'react-redux';

const AdminApproveArticle = () => {
  const { width } = useViewport();
  const open = useSelector((state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen);
  const maxWidth = open || width < 768 ? '100%' : `${width - 300}px`;

  return (
    <AdminApproveArticleProvider>
      <div className="flex flex-col gap-4 pt-0 h-full">
        <AdminFilterApproveArticleProvider />
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
                <span className="text-foreground text-[18px]">Phê duyệt bài viết</span>
              </div>
            </div>
            <AdminApproveArticleWithPagination />
          </div>
        </div>
      </div>
    </AdminApproveArticleProvider>
  );
};

export default AdminApproveArticle;
