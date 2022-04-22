import React from 'react';
import {AnyAction} from 'redux';
import {Link, useNavigate} from 'react-router-dom';
import Block from '@/components/Block/Block';
import {useDispatch} from 'react-redux';
import {signUp} from '@/store/auth/actions';
import Form, {TFormResponse} from '../../components/Form/Form';
import Button, {EButtonView} from '../../components/Button/Button';
import {ROUTES} from '../consts';

const initialFormData = [
  {name: 'email', label: 'Почта', type: 'email'},
  {name: 'login', label: 'Логин'},
  {name: 'first_name', label: 'Имя'},
  {name: 'second_name', label: 'Фамилия'},
  {name: 'phone', label: 'Телефон', type: 'tel'},
  {name: 'password', label: 'Пароль', type: 'password'},
];

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formAction = (data: TFormResponse) => {
    dispatch(signUp({data, redirectFn: () => navigate(ROUTES.HOME)}) as unknown as AnyAction);
  };
  return (
    <Block title="Вход">
      <Form initialData={initialFormData} onSubmit={formAction}>
        <Button type="submit">Зарегистритроваться</Button>
        <Link to={ROUTES.AUTH}>
          <Button view={EButtonView.transparent}>Войти</Button>
        </Link>
      </Form>
    </Block>
  );
}
