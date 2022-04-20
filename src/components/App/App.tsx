import React, {ReactElement} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';

import Error500 from '@/pages/Errors/Error500';
import setAppHeightStyleProperty from '@/utils/setAppHeightStyleProperty';
import Router from '../Router/Router';

window.visualViewport.addEventListener('resize', setAppHeightStyleProperty);
window.visualViewport.addEventListener('scroll', setAppHeightStyleProperty);

setAppHeightStyleProperty();

function App(): ReactElement {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={Error500}>
        <Router />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
