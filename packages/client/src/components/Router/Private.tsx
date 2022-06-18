import Error404 from '@/pages/Errors/Error404';
import React from 'react';
import {Navigate} from 'react-router';

interface IPrivateProps {
  Component: React.FC;
  allowed: boolean;
  redirect?: string;
}

function Private({Component, allowed, redirect}: IPrivateProps) {
  if (allowed) {
    return <Component />;
  }
  if (redirect) {
    return <Navigate to={redirect} replace />;
  }
  return <Error404 />;
}

export default Private;
