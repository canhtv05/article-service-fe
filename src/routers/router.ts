import configs from '@/configs';
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const AuthorSwitch = lazy(() => import('@/pages/AuthorSwitch'));
const PRChart = lazy(() => import('@/pages/PR/PRChart'));
const AdminChart = lazy(() => import('@/pages/Admin/AdminChart'));
const RegisterWrite = lazy(() => import('@/pages/User/UserRegisterWrite'));
const StaffListArticles = lazy(() => import('@/pages/Staff/StaffListArticles'));
const LoginForm = lazy(() => import('@/pages/Login'));

const publicRoutes = [
  {
    path: configs.routes.home,
    component: Home,
    layout: null,
  },
  {
    path: configs.routes.login,
    component: LoginForm,
    layout: null,
  },
];

const privateRoutes = [
  {
    path: configs.routes.authorSwitch,
    component: AuthorSwitch,
    layout: null,
  },
  {
    path: configs.routes.pr.chart,
    component: PRChart,
  },
  {
    path: configs.routes.admin.chart,
    component: AdminChart,
  },
  {
    path: configs.routes.user.registerWrite,
    component: RegisterWrite,
  },
  {
    path: configs.routes.staff.listArticles,
    component: StaffListArticles,
  },
];

const modals = [
  {
    path: configs.routes.home,
    component: Home,
  },
];

export { publicRoutes, privateRoutes, modals };
