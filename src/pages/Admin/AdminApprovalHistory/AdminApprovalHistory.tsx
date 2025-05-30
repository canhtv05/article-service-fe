import AdminApprovalHistoryWithPagination from '@/components/admin/AdminApprovalHistoryWithPagination';
import AdminFilterApprovalHistoryProvider from '@/components/admin/AdminFilterApprovalHistoryProvider';
import AdminApprovalHistoryProvider from '@/contexts/provider/admin/AdminApprovalHistoryProvider';
import useViewport from '@/hooks/useViewport';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';
import { useSelector } from 'react-redux';

const AdminApprovalHistory = () => {
  const { width } = useViewport();
  const open = useSelector((state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen);
  const maxWidth = open || width < 768 ? '100%' : `${width - 300}px`;

  return (
    <AdminApprovalHistoryProvider>
      <div className="flex flex-col gap-4 pt-0 h-full">
        <AdminFilterApprovalHistoryProvider />
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
                <span className="text-foreground text-[18px]">Lịch sử phê duyệt</span>
              </div>
            </div>
            <AdminApprovalHistoryWithPagination />
          </div>
        </div>
      </div>
    </AdminApprovalHistoryProvider>
  );
};

export default AdminApprovalHistory;
