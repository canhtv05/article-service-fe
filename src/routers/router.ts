import configs from '@/configs';
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/home'));

const AuthorSwitch = lazy(() => import('@/pages/author_switch'));

const PRChart = lazy(() => import('@/pages/pr/PRChart'));
const PRTopicManagement = lazy(() => import('@/pages/pr/PRTopicManagement'));
const PRListArticles = lazy(() => import('@/pages/pr/PRListArticles'));
const ViewArticle = lazy(() => import('@/components/pr/ViewArticle'));
const PRStaffs = lazy(() => import('@/pages/pr/PRStaffs'));
const PRAssignedStaff = lazy(() => import('@/components/pr/PRAssignedStaff'));

const AdminChart = lazy(() => import('@/pages/admin/AdminChart'));
const AdminRegistrationPeriod = lazy(() => import('@/pages/admin/AdminRegistrationPeriod'));

const RegisterWrite = lazy(() => import('@/pages/user/UserRegisterWrite'));

const StaffListArticles = lazy(() => import('@/pages/staff'));

const LoginForm = lazy(() => import('@/pages/login'));

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
    path: configs.routes.pr.topicManagement,
    component: PRTopicManagement,
  },
  {
    path: configs.routes.pr.listArticles.path,
    component: PRListArticles,
  },
  {
    path: configs.routes.pr.listStaffsPr.path,
    component: PRStaffs,
  },
  {
    path: configs.routes.pr.listStaffsPr.assigned_article,
    component: PRAssignedStaff,
  },
  {
    path: configs.routes.admin.chart,
    component: AdminChart,
  },
  {
    path: configs.routes.admin.registrationPeriod,
    component: AdminRegistrationPeriod,
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
    path: configs.routes.viewArticle,
    component: ViewArticle,
  },
];

export { publicRoutes, privateRoutes, modals };
