import LandingPage from '~components/LandingPage';
import Main from '~components/LandingPage/Pages/Main';
import Auth from '~components/LandingPage/Pages/Auth';

export default [
  {
    path: '/',
    component: LandingPage,
    children: [
      {
        path: '',
        name: 'LandingPage',
        component: Main,
      },
      {
        path: 'auth',
        name: 'AuthPage',
        component: Auth,
      },
    ],
  },
];
