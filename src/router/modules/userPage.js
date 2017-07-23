import UserPage from '~components/UserPage';
import MainPage from '~components/UserPage/Pages/Main';

import AlbumPage from '~components/UserPage/Pages/Album';

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
      {
        path: ':albumName',
        name: 'AlbumPage',
        component: AlbumPage,
      },
    ],
  },
];
