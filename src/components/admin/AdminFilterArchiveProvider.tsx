import DataFilters from '../DataFilters';
import AdminFilterArchiveComponent from './AdminFilterArchiveComponent';
import { useAdminArchiveContext } from '@/contexts/context/admin/AdminArchiveContext';

const AdminFilterArchiveProvider = () => {
  const archive = useAdminArchiveContext();

  return (
    <DataFilters
      onClear={archive?.handleClearFields}
      onSearch={archive?.handleFilters}
      filterComponent={<AdminFilterArchiveComponent />}
      gridCols={3}
    />
  );
};

export default AdminFilterArchiveProvider;
