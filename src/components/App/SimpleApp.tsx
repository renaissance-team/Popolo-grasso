import React, {ReactElement, useEffect} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {hot} from 'react-hot-loader/root';

import Error500 from '@/pages/Errors/Error500';
import Error404 from '@/pages/Errors/Error404';
import {init, getUser} from '@/store/auth/actions';
import {useAppSelector, useDidUpdateEffect} from '@/utils';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ROUTES} from '@/pages/consts';
import Home from '@/pages/Home/Home';
import {Routes, Route} from 'react-router-dom';
import MainContainer from '../MainContainer/MainContainer';

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
    <ErrorBoundary FallbackComponent={Error500}>
      <MainContainer>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </MainContainer>
    </ErrorBoundary>
  );
}

export default hot(App);
