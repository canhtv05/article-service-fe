import { useSelector } from 'react-redux';

import useViewport from '@/hooks/useViewport';
import { cn } from '@/lib/utils';
import AdminRegistrationPeriodProvider from '@/contexts/provider/admin/AdminRegistrationPeriodProvider';
import AdminFilterRegistrationPeriodProvider from '@/components/admin/AdminFilterRegistrationPeriodProvider';
import AdminRegistrationTable from '@/components/admin/AdminRegistrationTable';

const AdminRegistrationPeriod = () => {
  const { width } = useViewport();
  const open = useSelector((state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen);
  const maxWidth = open || width < 768 ? '100%' : `${width - 300}px`;

  return (
    <AdminRegistrationPeriodProvider>
      <div className="flex flex-col gap-4 pt-0 h-full">
        <AdminFilterRegistrationPeriodProvider />
        <div
          className={cn(
            'rounded-xl md:min-h-min flex-1 border w-full h-full transition-[max-width] duration-300 ease-in-out overflow-hidden',
          )}
          style={{ maxWidth }}
        >
          <AdminRegistrationTable />
        </div>
      </div>
    </AdminRegistrationPeriodProvider>
  );
};

export default AdminRegistrationPeriod;
