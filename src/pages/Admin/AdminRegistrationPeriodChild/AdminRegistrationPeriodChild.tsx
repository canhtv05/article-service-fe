import { useSelector } from 'react-redux';

import useViewport from '@/hooks/useViewport';
import { cn } from '@/lib/utils';
import AdminRegistrationPeriodChildUpdate from '@/components/admin/AdminRegistrationPeriodChildUpdate';
import AdminRegistrationTableChild from '@/components/admin/AdminRegistrationTableChild';

const AdminRegistrationPeriodChild = () => {
  const { width } = useViewport();
  const open = useSelector((state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen);
  const maxWidth = open || width < 768 ? '100%' : `${width - 290}px`;

  return (
    <div className="flex flex-col gap-4 pt-0 h-full">
      <AdminRegistrationPeriodChildUpdate />
      <div
        className={cn(
          'rounded-xl md:min-h-min flex-1 border w-full h-full transition-[max-width] duration-300 ease-in-out overflow-hidden',
        )}
        style={{ maxWidth }}
      >
        <AdminRegistrationTableChild />
      </div>
    </div>
  );
};

export default AdminRegistrationPeriodChild;
