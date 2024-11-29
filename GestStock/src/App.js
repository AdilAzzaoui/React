import React, { Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Immeuble = React.lazy(() => import('./views/immeuble/Immeuble'));

const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const Logout = React.lazy(() => import('./components/Logout'));
const ForgotPass = React.lazy(() => import('./views/pages/forgotPassword/ForgotPasswordForm'));
// Dashboard
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          {/* <Route exact path="/login" name="Login Page" element={<Login />} /> */}
          {/* <Route exact path="/register" name="Register Page" element={<Register />} /> */}
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="/immeuble" element={<Immeuble />} />
          <Route exact path="/logout" name="Logout" element={<Logout />} />
          {/* <Route exact path="/forgotPassword" name="ForgotPassword" element={<ForgotPass />} /> */}
          {/* Unprotected Route for Dashboard */}

          {/* Protected Routes */}
          <Route
            path="*"
            name="Home"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <DefaultLayout />
              </Suspense>
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>

  );
};

export default App;
