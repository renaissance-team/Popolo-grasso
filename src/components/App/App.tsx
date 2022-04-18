import React, {ReactElement, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';

import Error500 from '@/pages/Errors/Error500';
import {useDispatch} from 'react-redux';
import {EAuthActionType} from '@/store/auth/saga';
import Router from '../Router/Router';
import MainContainer from '../MainContainer/MainContainer';

function App(): ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: EAuthActionType.GET_USER});
  }, []);
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={Error500}>
        <MainContainer>
          <Router />
        </MainContainer>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
