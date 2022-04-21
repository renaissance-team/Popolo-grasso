import React, {ReactElement, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';

import Error500 from '@/pages/Errors/Error500';
import {useDispatch} from 'react-redux';
import {getUser} from '@/store/auth/actions';
import {useAppSelector, useDidUpdateEffect} from '@/utils';
import Router from '../Router/Router';
import MainContainer from '../MainContainer/MainContainer';

function App(): ReactElement {
  const dispatch = useDispatch();
  const {isAuth} = useAppSelector((state) => state.auth);
  const {data: userData} = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useDidUpdateEffect(() => {
    if (isAuth && !userData) dispatch(getUser());
  }, [isAuth, userData]);

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
