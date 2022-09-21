import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';

export default function MyRoute({ children, isClosed, location }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isClosed && !isLoggedIn) {
    return <Navigate to="/login" state={{ prevPath: location }} />;
  }

  return children;
}

MyRoute.defaultProps = {
  isClosed: false,
  location: '',
};

MyRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isClosed: PropTypes.bool,
  location: PropTypes.string,
};
