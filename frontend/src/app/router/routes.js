import React from 'react';
import loadable from '@loadable/component';
import Loader from '../pages/layouts/client/Loader';

const routes = [
  {
    path: '/',
    key: 'home',
    exact: true,
    component: loadable(() => import('../pages/home/Home'), {
      fallback: <Loader />,
    }),
  },
  {
    path: '/available',
    key: 'available',
    exact: true,
    component: loadable(() => import('../pages/available/Available'), {
      fallback: <Loader />,
    }),
  },
  {
    path: '/upcoming',
    key: 'upcoming',
    exact: true,
    component: loadable(() => import('../pages/upcoming/Upcoming'), {
      fallback: <Loader />,
    }),
  },
  {
    path: '/gone',
    key: 'gone',
    exact: true,
    component: loadable(() => import('../pages/gone/Gone'), {
      fallback: <Loader />,
    }),
  },
  {
    path: '/login',
    key: 'login',
    exact: true,
    component: loadable(() => import('../pages/auth/Login'), {
      fallback: <Loader />,
    }),
  },
  {
    path: '/register',
    key: 'register',
    exact: true,
    component: loadable(() => import('../pages/auth/Register'), {
      fallback: <Loader />,
    }),
  },
  {
    path: '/product/:slug',
    key: 'product',
    exact: true,
    component: loadable(() => import('../pages/product/ProductPage'), {
      fallback: <Loader />,
    }),
  },
  {
    path: '/cart',
    key: 'cart',
    exact: true,
    component: loadable(() => import('../pages/product/CheckoutPage'), {
      fallback: <Loader />,
    }),
  },
];

export default routes;
