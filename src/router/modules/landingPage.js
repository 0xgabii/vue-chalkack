import LandingPage from '~components/LandingPage';
import Main from '~components/LandingPage/Pages/Main';
import Login from '~components/LandingPage/Pages/Login';
import Register from '~components/LandingPage/Pages/Register';

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
        name: 'LoginPage',
        component: Login,
      },
      {
        path: 'auth/register',
        name: 'RegisterPage',
        component: Register,
      },
    ],
  },
];
