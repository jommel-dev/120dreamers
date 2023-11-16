const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      // { path: '/', redirect: '/login' },
      {
        path: '',
        name: 'landing',
        component: () => import('pages/IndexPage.vue')
      },
      { path: 'login', component: () => import('src/pages/LoginPage.vue') },
      { path: 'register', component: () => import('src/pages/RegisterPage.vue') },
      { path: 'features', component: () => import('src/pages/FeaturesPage.vue') }
    ],
    meta: { auth: false }
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/Dashboard.vue')
      },
      {
        path: 'dailyJournal',
        name: 'dailyJournal',
        component: () => import('pages/DailyJournal.vue')
      },
      {
        path: 'portfolio',
        name: 'portfolio',
        component: () => import('pages/Portfolio.vue')
      },
      {
        path: 'tradeLogs',
        name: 'tradeLogs',
        component: () => import('pages/TradeLogs.vue')
      },
      {
        path: 'dreamers',
        name: 'dreamers',
        component: () => import('pages/DreamersUniversity.vue')
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('pages/AccountProfile.vue')
      },
      {
        path: 'newTrade',
        name: 'newTrade',
        component: () => import('pages/NewTrade.vue')
      },
      {
        path: 'allPlatforms',
        name: 'allPlatforms',
        component: () => import('pages/BrokerList.vue')
      },
      {
        path: 'tradingFloor',
        name: 'tradingFloor',
        component: () => import('pages/TradingFloor.vue')
      },
      {
        path: 'broadCastNewTrade',
        name: 'broadCastNewTrade',
        component: () => import('pages/BroadcastNewTradePage.vue')
      },
      {
        path: 'goLivePage',
        name: 'goLivePage',
        component: () => import('pages/GoLivePage.vue')
      },
      {
        path: 'tradingFloor',
        name: 'tradingFloor',
        component: () => import('pages/TradingFloor.vue')
      },
    ],
    meta: { auth: true }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
