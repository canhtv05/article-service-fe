import { useSelector } from 'react-redux';

import AdminRegistrationPeriodDetailUpdate from '@/components/admin/AdminRegistrationPeriodDetailUpdate';
import AdminRegistrationTableDetail from '@/components/admin/AdminRegistrationTableDetail';
import useViewport from '@/hooks/useViewport';
import { cn } from '@/lib/utils';

const AdminRegistrationPeriodDetail = () => {
  const { width } = useViewport();
  const open = useSelector((state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen);
  const maxWidth = open || width < 768 ? '100%' : `${width - 290}px`;

  return (
    <div className="flex flex-col gap-4 pt-0 h-full">
      <AdminRegistrationPeriodDetailUpdate />
      <div
        className={cn(
          'rounded-xl md:min-h-min flex-1 border w-full h-full transition-[max-width] duration-300 ease-in-out overflow-hidden',
        )}
        style={{ maxWidth }}
      >
        <AdminRegistrationTableDetail />
      </div>
    </div>
  );
};

export default AdminRegistrationPeriodDetail;
