const routes = {
  home: '/',
  login: '/login',
  authorSwitch: '/author-switch',
  pr: {
    chart: '/pr/chart',
    topicManagement: '/pr/topic-management',
    listArticles: {
      path: '/pr/list-articles',
    },
    listStaffsPr: {
      path: '/pr/staffs-pr',
      assigned_article: '/pr/staffs-pr/assigned-article/:id',
    },
  },
  admin: {
    chart: '/admin/chart',
    registrationPeriod: '/admin/registration-period',
    registrationPeriodDetail: '/admin/registration-period/detail/:id',
    registrationPeriodChild: '/admin/registration-period/child/:id',
    approveArticle: '/admin/approve-article',
    archive: '/admin/archive',
  },
  user: {
    registerWrite: '/user/register-to-write',
  },
  staff: {
    listArticles: '/staff/list-articles',
  },
  modals: {
    viewArticle: '/view/articles/:id',
    addUsersToCampaign: '/add/users-to-campaign/:id',
    approveArticle: '/approve-article/:id',
  },
};

export default routes;
