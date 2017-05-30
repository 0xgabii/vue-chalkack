import UserPage from '~components/UserPage';

export default [
  {
    path: '/home',
    meta: { requiresAuth: true },
    component: UserPage,
  },
];
