import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, isProtected, ...rest }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isProtected && !token) {
      navigate('/login');
    }
  }, [navigate, token, isProtected]);

  return isProtected && !token ? null : <Component {...rest} />;
};

export default ProtectedRoute;
