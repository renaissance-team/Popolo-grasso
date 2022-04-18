import {ROUTES} from '@/pages/consts';
import React from 'react';
import {Navigate} from 'react-router-dom';

interface IPrivateProps {
    Component: React.FC;
    allowed: boolean;
    redirectPath?: string;
  }

function Private({Component, allowed, redirectPath = ROUTES.AUTH}: IPrivateProps) {
  return allowed ? <Component /> : <Navigate to={redirectPath} />;
}

export default Private;
