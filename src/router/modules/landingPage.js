import LandingPage from '~components/LandingPage';
import Main from '~components/LandingPage/Pages/Main';
import SignIn from '~components/LandingPage/Pages/SignIn';
import SignUp from '~components/LandingPage/Pages/SignUp';

export default [
  {
    path: '/',
    component: LandingPage,
    children: [
      {
        path: '',
        component: Main,
      },
      {
        path: 'signin',
        component: SignIn,
      },
      {
        path: 'signup',
        component: SignUp,
      },
    ],
  },
];
