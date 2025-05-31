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
    history: '/admin/approval-history',
  },
  user: {
    registerWrite: '/user/register-to-write',
    registerWriteID: '/user/register-to-write/:id',
    createArticle: '/user/create-article',
    listArticle: '/user/list-articles',
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
