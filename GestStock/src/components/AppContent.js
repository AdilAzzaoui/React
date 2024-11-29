import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';

// Importez ProtectedRoute correctement
import ProtectedRoute from '../ProtectedRoute';

// routes config
import routes from '../routes';

const AppContent = () => {
  return (
    <CContainer className="px-0 mt-0" fluid>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              <Route
                key={idx}
                path={route.path}
                element={
                  <ProtectedRoute
                    element={route.element}
                    protected={route.protected || false}
                  />
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
