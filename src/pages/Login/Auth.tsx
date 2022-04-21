import React from 'react';
import {Link} from 'react-router-dom';
import Block from '@/components/Block/Block';
import {useDispatch} from 'react-redux';
import {signIn} from '@/store/auth/actions';
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
  const dispatch = useDispatch();
  const formAction = (data: TFormResponse) => {
    dispatch(signIn(data));
  };
  return (
    <Block title="Вход">
      <Form initialData={initialFormData} onSubmit={formAction}>
        <Button type="submit">Войти</Button>
        <Link to={ROUTES.REGISTRATION}>
          <Button view={EButtonView.transparent}>Зарегистритроваться</Button>
        </Link>
      </Form>
    </Block>
  );
}
