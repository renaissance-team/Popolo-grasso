import {TUserResponse} from '@/api/types';
import {TFormResponse} from '@/components/Form/Form';
import authController from '@/controllers/auth-controller';
import userController from '@/controllers/user-controller';
import {AxiosResponse} from 'axios';
import {call, takeEvery, put} from 'redux-saga/effects';
import {setUser, setLoading, clearUser} from './reducer';

export enum EAuthActionType {
  GET_USER = 'AUTH/GET_USER',
  SET_USER = 'AUTH/SET_USER',
  SIGN_IN = 'AUTH/SIGN_IN',
  SIGN_UP = 'AUTH/SIGN_UP',
  LOGOUT = 'AUTH/LOGOUT'
}

type ActionType = { data: TFormResponse, type: string }

function* signInSaga({data}: ActionType) {
  try {
    yield put(setLoading(true));
    yield call(authController.signIn, data);
    const response: AxiosResponse<TUserResponse> = yield call(authController.getUser);
    yield put(setUser(response.data));
  } catch (error) {
    console.info(error);
  }
  yield put(setLoading(false));
}

function* signUpSaga({data}: ActionType) {
  try {
    yield put(setLoading(true));
    yield call(authController.signUp, data);
    const response: AxiosResponse<TUserResponse> = yield call(authController.getUser);
    yield put(setUser(response.data));
  } catch (error) {
    console.info(error);
  }
  yield put(setLoading(false));
}

function* getUserSaga() {
  try {
    yield put(setLoading(true));
    const response: AxiosResponse<TUserResponse> = yield call(authController.getUser);
    yield put(setUser(response.data));
  } catch (error) {
    console.info(error);
  }
  yield put(setLoading(false));
}

function* setUserSaga({data}: ActionType) {
  try {
    yield put(setLoading(true));
    const response: AxiosResponse<TUserResponse> = yield call(userController.changeUser, data);
    yield put(setUser(response.data));
  } catch (error) {
    console.info(error);
  }
  yield put(setLoading(false));
}

function* logoutSaga() {
  try {
    yield put(setLoading(true));
    yield call(authController.logout);
    yield put(clearUser());
  } catch (error) {
    console.info(error);
  }
  yield put(setLoading(false));
}

export default function* authWatcher() {
  yield takeEvery(EAuthActionType.GET_USER, getUserSaga);
  yield takeEvery(EAuthActionType.SET_USER, setUserSaga);
  yield takeEvery(EAuthActionType.LOGOUT, logoutSaga);
  yield takeEvery(EAuthActionType.SIGN_IN, signInSaga);
  yield takeEvery(EAuthActionType.SIGN_UP, signUpSaga);
}
