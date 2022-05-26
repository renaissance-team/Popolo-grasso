import React, {ReactElement, useEffect} from 'react';
import {AnyAction} from 'redux';
import {ErrorBoundary} from 'react-error-boundary';

import Error500 from '@/pages/Errors/Error500';
import {useDispatch} from 'react-redux';
import {getUser, init, oAuthSignIn} from '@/store/auth/actions';
import {useAppSelector, useDidUpdateEffect} from '@/utils';
import setAppHeightStyleProperty from '@/utils/setAppHeightStyleProperty';

import {useLocation} from 'react-router-dom';
import Router from '../Router/Router';
import MainContainer from '../MainContainer/MainContainer';

if (typeof window !== 'undefined') {
  window.visualViewport.addEventListener('resize', setAppHeightStyleProperty);
  window.visualViewport.addEventListener('scroll', setAppHeightStyleProperty);
}
setAppHeightStyleProperty();

function App(): ReactElement {
  const dispatch = useDispatch();
  const location = useLocation();

  const {isAuth} = useAppSelector((state) => state.auth);
  const {data: userData} = useAppSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const oAuthCode = urlParams.get('code');
    if (oAuthCode) {
      dispatch(oAuthSignIn({
        code: oAuthCode,
        redirect_uri: window.location.host,
      }) as unknown as AnyAction);
    } else {
      dispatch(init() as unknown as AnyAction);
    }
  }, []);

  useDidUpdateEffect(() => {
    if (isAuth && !userData) dispatch(getUser() as unknown as AnyAction);
  }, [isAuth, userData]);

  return (
    <ErrorBoundary FallbackComponent={Error500}>
      <MainContainer>
        <Router />
      </MainContainer>
    </ErrorBoundary>
  );
}

export default App;
