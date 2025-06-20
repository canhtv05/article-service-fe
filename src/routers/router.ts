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

const ModalAddUserToCampaign = lazy(() => import('@/components/admin/ModalAddUserToCampaign'));
const AdminModalApproveArticle = lazy(() => import('@/components/admin/AdminModalApproveArticle'));
const AdminChart = lazy(() => import('@/pages/admin/AdminChart'));
const AdminRegistrationPeriod = lazy(() => import('@/pages/admin/AdminRegistrationPeriod'));
const AdminRegistrationPeriodDetail = lazy(() => import('@/pages/admin/AdminRegistrationPeriodDetail'));
const AdminRegistrationPeriodChild = lazy(() => import('@/pages/admin/AdminRegistrationPeriodChild'));
const AdminApproveArticle = lazy(() => import('@/pages/admin/AdminApproveArticle'));
const AdminArchive = lazy(() => import('@/pages/admin/AdminArchive'));
const AdminApprovalHistory = lazy(() => import('@/pages/admin/AdminApprovalHistory'));

const UserRegisterWrite = lazy(() => import('@/pages/user/UserRegisterWrite'));
const UserRegisterWriteDetail = lazy(() => import('@/pages/user/UserRegisterWriteDetail'));
const UserCreateArticle = lazy(() => import('@/pages/user/UserCreateArticle'));
const UserListArticles = lazy(() => import('@/pages/user/UserListArticles'));
const UserMyArticles = lazy(() => import('@/pages/user/UserMyArticles'));

const StaffListArticles = lazy(() => import('@/pages/staff'));

const LoginForm = lazy(() => import('@/pages/login'));
const Profile = lazy(() => import('@/components/user/UserProfile'));

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
    path: configs.routes.admin.registrationPeriodDetail,
    component: AdminRegistrationPeriodDetail,
  },
  {
    path: configs.routes.admin.registrationPeriodChild,
    component: AdminRegistrationPeriodChild,
  },
  {
    path: configs.routes.admin.approveArticle,
    component: AdminApproveArticle,
  },
  {
    path: configs.routes.admin.archive,
    component: AdminArchive,
  },
  {
    path: configs.routes.admin.history,
    component: AdminApprovalHistory,
  },
  {
    path: configs.routes.user.registerWrite,
    component: UserRegisterWrite,
  },
  {
    path: configs.routes.user.registerWriteID,
    component: UserRegisterWriteDetail,
  },
  {
    path: configs.routes.user.createArticle,
    component: UserCreateArticle,
  },
  {
    path: configs.routes.user.listArticle,
    component: UserListArticles,
  },
  {
    path: configs.routes.user.myArticles,
    component: UserMyArticles,
  },
  {
    path: configs.routes.staff.listArticles,
    component: StaffListArticles,
  },
];

const modals = [
  {
    path: configs.routes.modals.viewArticle,
    component: ViewArticle,
  },
  {
    path: configs.routes.modals.approveArticle,
    component: AdminModalApproveArticle,
  },
  {
    path: configs.routes.modals.addUsersToCampaign,
    component: ModalAddUserToCampaign,
  },
  {
    path: configs.routes.modals.profile,
    component: Profile,
  },
];

export { publicRoutes, privateRoutes, modals };
