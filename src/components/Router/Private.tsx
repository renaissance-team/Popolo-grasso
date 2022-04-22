import Error404 from '@/pages/Errors/Error404';
import React from 'react';

interface IPrivateProps {
  Component: React.FC;
  allowed: boolean;
}

function Private({Component, allowed}: IPrivateProps) {
  return allowed ? <Component /> : <Error404 />;
}

export default Private;
