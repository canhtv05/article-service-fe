import { List, Plus } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from '../ui/button';
import useViewport from '@/hooks/useViewport';
import AdminRegistrationTableChildWithPagination from './AdminRegistrationTableChildWithPagination';
import AdminRegistrationChildProvider from '@/contexts/provider/admin/AdminRegistrationChildProvider';

const AdminRegistrationTableChild = () => {
  const location = useLocation();

  const list = location.pathname.split('/');
  const path = list[list.length - 1];

  const navigate = useNavigate();
  const { width } = useViewport();
  const open = useSelector((state: { sidebar: { isOpen: boolean } }) => state.sidebar.isOpen);
  const maxWidth = open || width < 768 ? '100%' : `${width - 350}px`;

  return (
    <AdminRegistrationChildProvider>
      <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
        <div className="flex gap-3 items-center justify-between mb-10 lg:flex-row flex-col">
          <div className="flex gap-3 items-center w-full">
            <List />
            <span className="text-foreground text-[18px]">Danh sách phân công giảng viên</span>
          </div>
          <div className="flex flex-col sm:grid grid-cols-2 lg:flex lg:flex-row gap-2">
            <Button variant={'default'} className="py-5 rounded-full" onClick={() => navigate(-1)}>
              Quay lại
            </Button>

            <Link to={`/add/users-to-campaign/${path}`} state={{ background: location }}>
              <Button customize={'default'} className="py-5 rounded-full">
                <Plus />
                Thêm / sửa giảng viên vào đợt
              </Button>
            </Link>
          </div>
        </div>
        <div style={{ maxWidth }}>
          <AdminRegistrationTableChildWithPagination />
        </div>
      </div>
    </AdminRegistrationChildProvider>
  );
};

export default AdminRegistrationTableChild;
