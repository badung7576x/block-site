import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/options.html',
    redirect: () => {
      return {
        path: '/blocksites',
      };
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/blocksites',
        name: 'BlocksitePage',
        component: () => import('pages/BlocksitePage.vue'),
      },
      {
        path: '/study_sets',
        name: 'StudySetPage',
        component: () => import('src/pages/StudySetPage.vue'),
      },
      {
        path: '/study_sets/:id',
        name: 'StudySetDetailPage',
        component: () => import('src/pages/StudySetDetailPage.vue'),
      },
      {
        path: '/study_sets/:id/edit',
        name: 'EditStudySetPage',
        component: () => import('src/pages/EditStudySetPage.vue'),
      },
      {
        path: '/study_sets/create',
        name: 'CreateStudySetPage',
        component: () => import('src/pages/CreateStudySetPage.vue'),
      },
      {
        path: '/settings',
        name: 'SettingPage',
        component: () => import('pages/SettingPage.vue'),
      },
    ],
  },
  {
    path: '',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      {
        path: '/index.html',
        name: 'LearnPage',
        component: () => import('pages/LearnPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
