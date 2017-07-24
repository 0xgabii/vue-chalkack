import UserPage from '~components/UserPage';


import MainPage from '~components/UserPage/Pages/Main';
import CreateAlbum from '~components/UserPage/Modals/CreateAlbum';

import AlbumPage from '~components/UserPage/Pages/Album';
import UploadPhoto from '~components/UserPage/Modals/UploadPhoto';


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
        children: [
          {
            path: 'create-album',
            name: 'CreateAlbum',
            component: CreateAlbum,
          },
        ],
      },
      {
        path: ':albumName',
        name: 'AlbumPage',
        component: AlbumPage,
        children: [
          {
            path: 'upload',
            name: 'UploadPhoto',
            component: UploadPhoto,
          },
        ],
      },
    ],
  },
];
