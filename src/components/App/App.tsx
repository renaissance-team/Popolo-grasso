import React, {ReactElement, useEffect} from 'react';
import {AnyAction} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';

import Error500 from '@/pages/Errors/Error500';
import {useDispatch} from 'react-redux';
import {getUser, init} from '@/store/auth/actions';
import {useAppSelector, useDidUpdateEffect} from '@/utils';
import setAppHeightStyleProperty from '@/utils/setAppHeightStyleProperty';
import Router from '../Router/Router';
import MainContainer from '../MainContainer/MainContainer';

window.visualViewport.addEventListener('resize', setAppHeightStyleProperty);
window.visualViewport.addEventListener('scroll', setAppHeightStyleProperty);

setAppHeightStyleProperty();

function App(): ReactElement {
  const dispatch = useDispatch();
  const {isAuth} = useAppSelector((state) => state.auth);
  const {data: userData} = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(init() as unknown as AnyAction);
  }, []);

  useDidUpdateEffect(() => {
    if (isAuth && !userData) dispatch(getUser() as unknown as AnyAction);
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
