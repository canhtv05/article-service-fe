import { useSelector } from 'react-redux';

import useViewport from '@/hooks/useViewport';
import { cn } from '@/lib/utils';
import AdminArchiveProvider from '@/contexts/provider/admin/AdminArchiveProvider';
import AdminFilterArchiveProvider from '@/components/admin/AdminFilterArchiveProvider';
import AdminArchiveTable from '@/components/admin/AdminArchiveTable';

const AdminArchive = () => {
  const { width } = useViewport();
  const open = useSelector((state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen);
  const maxWidth = open || width < 768 ? '100%' : `${width - 300}px`;

  return (
    <AdminArchiveProvider>
      <div className="flex flex-col gap-4 pt-0 h-full">
        <AdminFilterArchiveProvider />
        <div
          className={cn(
            'rounded-xl md:min-h-min flex-1 border w-full h-full transition-[max-width] duration-300 ease-in-out overflow-hidden',
          )}
          style={{ maxWidth }}
        >
          <AdminArchiveTable />
        </div>
      </div>
    </AdminArchiveProvider>
  );
};

export default AdminArchive;
