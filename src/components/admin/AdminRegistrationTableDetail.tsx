import { List, Plus } from 'lucide-react';

import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import AdminRegistrationDetailProvider from '@/contexts/provider/admin/AdminRegistrationDetailProvider';
import useViewport from '@/hooks/useViewport';
import { useSelector } from 'react-redux';
import AdminRegistrationTableDetailWithPagination from './AdminRegistrationTableDetailWithPagination';

const AdminRegistrationTableDetail = () => {
  const { width } = useViewport();
  const open = useSelector((state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen);
  const maxWidth = open || width < 768 ? '100%' : `${width - 350}px`;

  return (
    <AdminRegistrationDetailProvider>
      <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
        <div className="flex gap-3 items-center justify-between mb-10 lg:flex-row flex-col">
          <div className="flex gap-3 items-center w-full">
            <List />
            <span className="text-foreground text-[18px]">Danh sách đợt viết bài</span>
          </div>
          <div className="grid grid-cols-2 lg:flex lg:flex-row gap-2">
            <Link to={`/admin/registration-period`}>
              <Button variant={'default'} className="py-5 rounded-full">
                Quay lại
              </Button>
            </Link>

            <Button customize={'default'} className="py-5 rounded-full">
              <Plus />
              Tạo đợt bài viết
            </Button>
          </div>
        </div>
        <div style={{ maxWidth }}>
          <AdminRegistrationTableDetailWithPagination />
        </div>
      </div>
    </AdminRegistrationDetailProvider>
  );
};

export default AdminRegistrationTableDetail;
