import { useContext } from 'react';
import DataFilters from '../DataFilters';
import AdminFilterRegistrationPeriodComponent from './AdminFilterRegistrationPeriodComponent';
import { AdminRegistrationPeriodContext } from '@/contexts/context/admin/AdminRegistrationPeriodContext';

const AdminFilterRegistrationPeriodProvider = () => {
  const registrationPeriod = useContext(AdminRegistrationPeriodContext);

  return (
    <DataFilters
      onClear={registrationPeriod?.handleClearFields}
      onSearch={registrationPeriod?.handleFilters}
      filterComponent={<AdminFilterRegistrationPeriodComponent />}
      gridCols={2}
    />
  );
};

export default AdminFilterRegistrationPeriodProvider;
