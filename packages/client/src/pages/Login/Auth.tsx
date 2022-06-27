import React from 'react';
import {AnyAction} from 'redux';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Block from '@/components/Block/Block';
import {getOAuthServiceId, signIn} from '@/store/auth/actions';
import {useAppSelector} from '@/utils';
import {VALIDATION_PATTERNS} from '@/components/Form/consts';
import Button, {EButtonView} from '../../components/Button/Button';
import {ROUTES} from '../consts';
import Form, {TFormResponse} from '../../components/Form/Form';

import styles from './login.module.scss';

const initialFormData = [
  {
    name: 'login',
    label: 'Логин',
    pattern: VALIDATION_PATTERNS.login,
    required: true,
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    // pattern: VALIDATION_PATTERNS.password,
    required: true,
  },
];

export default function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {loading} = useAppSelector((state) => state.auth);
  const formAction = (data: TFormResponse) => {
    dispatch(signIn({data, redirectFn: () => navigate(ROUTES.HOME)}) as unknown as AnyAction);
  };

  const oauthHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    // todo 'as unknown as AnyAction' выглядит странно
    dispatch(getOAuthServiceId(window.location.href) as unknown as AnyAction);
  };

  return (
    <Block title="Вход">
      <Form initialData={initialFormData} onSubmit={formAction} loading={loading}>
        <Button type="button" onClick={(event) => oauthHandler(event)} className={styles.oAuth}>
          Войти с помощью Яндекс.ID
        </Button>
        <Button type="submit">Войти</Button>
        <Link to={ROUTES.REGISTRATION}>
          <Button view={EButtonView.transparent}>Зарегистритроваться</Button>
        </Link>
      </Form>
    </Block>
  );
}
