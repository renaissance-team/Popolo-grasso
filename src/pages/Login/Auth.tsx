import React from 'react';
import {AnyAction} from 'redux';
import {Link, useNavigate} from 'react-router-dom';
import Block from '@/components/Block/Block';
import {useDispatch} from 'react-redux';
import {signIn} from '@/store/auth/actions';
import {useAppSelector} from '@/utils';
import Button, {EButtonView} from '../../components/Button/Button';
import {ROUTES} from '../consts';
import Form, {TFormResponse} from '../../components/Form/Form';

const initialFormData = [
  {name: 'login', label: 'Логин'},
  {
    name: 'password', label: 'Пароль', type: 'password',
  },
];

export default function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useAppSelector((state) => state.auth);
  const formAction = (data: TFormResponse) => {
    dispatch(signIn({data, redirectFn: () => navigate(ROUTES.HOME)}) as unknown as AnyAction);
  };
  return (
    <Block title="Вход">
      <Form initialData={initialFormData} onSubmit={formAction} loading={loading}>
        <Button type="submit">Войти</Button>
        <Link to={ROUTES.REGISTRATION}>
          <Button view={EButtonView.transparent}>Зарегистритроваться</Button>
        </Link>
      </Form>
    </Block>
  );
}
