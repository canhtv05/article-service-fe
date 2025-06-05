import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/zustand/authStore';

const PublicRoute = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  return !isAuth ? <Outlet /> : <Navigate to="/author-switch" replace />;
};

export default PublicRoute;
