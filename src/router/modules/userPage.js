import UserPage from '~components/UserPage';
import MainPage from '~components/UserPage/Pages/Main';

export default [
  {
    path: '/home',
    meta: { requiresAuth: true },
    component: UserPage,
    children: [
      {
        path: '',
        name: 'UserPage',
        component: MainPage,
      },
    ],
  },
];
