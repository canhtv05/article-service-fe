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
  },
  user: {
    registerWrite: '/user/register-to-write',
  },
  staff: {
    listArticles: '/staff/list-articles',
  },
  viewArticle: '/view/articles/:id',
};

export default routes;
