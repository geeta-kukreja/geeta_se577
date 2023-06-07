import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/MyInfoPage.vue') }],
  },
  {
    path: '/infoaboutme',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/MyInfoPage.vue') },
    ],
  },
  {
    path: '/allgists',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/GistsPage.vue') },
    ],
  },
  {
    path: '/allrepos',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/AllRepoPage.vue') },
    ],
  },
  {
    path: '/findrepo',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/FindPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
