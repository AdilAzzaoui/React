import { element } from 'prop-types';
import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const ForgotPass = React.lazy(() => import('./views/pages/forgotPassword/ForgotPasswordForm'));
const Product = React.lazy(() => import('./views/products/Product'));
const ProductHistory = React.lazy(() => import('./views/products/ProductHistory'));
// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'));
const ChangePassword = React.lazy(() => import('./views/ChangePassword/ChangePasswordForm'));
const ResetPassword = React.lazy(() => import('./views/pages/resetPassword/ResetPassword'));
const AddProduct = React.lazy(() => import('./views/products/AddProduct'));
const ProductComponents = React.lazy(() => import('./views/products/ProductComponents'));
const CommandesList =  React.lazy(() => import('./views/commandes/CommandesList'));
const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard}, // Redirection ici
  { path: '/updatePassword', name: 'UpdatePassword', element: ChangePassword , protected: true},
  { path: '/forgotPassword', name: 'ForgotPass', element: ForgotPass , protected: false},
  { path: '/resetPassword', name: 'ResetPassword', element: ResetPassword },
  { path: '/products', name: 'Product', element: Product },
  { path: '/add-product', name: 'Product', element: AddProduct },
  { path: '/product-history/:id', name: 'ProductHistory', element: ProductHistory },
  { path: '/product-components/:id', name: 'ProductHistory', element: ProductComponents },
  { path: '/login', name: 'Login', element: Login , protected: false},
  { path: '/dashboard', name: 'Dashboard', element: Dashboard},
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/register', name: 'Register', element: Register , protected: false},
  { path: '/commandes', name: 'CommandesList', element: CommandesList },

];

export default routes;
