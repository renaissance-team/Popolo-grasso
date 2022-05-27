import React from 'react';
import {AnyAction} from 'redux';
import {Link, useNavigate} from 'react-router-dom';
import Block from '@/components/Block/Block';
import {useDispatch} from 'react-redux';
import {signUp} from '@/store/auth/actions';
import {useAppSelector} from '@/utils';
import {VALIDATION_PATTERNS} from '@/components/Form/consts';
import Form, {TFormResponse} from '../../components/Form/Form';
import Button, {EButtonView} from '../../components/Button/Button';
import {ROUTES} from '../consts';

const initialFormData = [
  {
    name: 'email', label: 'Почта', type: 'email', pattern: VALIDATION_PATTERNS.email, required: true
  },
  {
    name: 'login', label: 'Логин', pattern: VALIDATION_PATTERNS.login, required: true
  },
  {
    name: 'first_name', label: 'Имя', pattern: VALIDATION_PATTERNS.name, required: true
  },
  {
    name: 'second_name', label: 'Фамилия', pattern: VALIDATION_PATTERNS.name, required: true
  },
  {
    name: 'phone', label: 'Телефон', type: 'tel', pattern: VALIDATION_PATTERNS.phone, required: true
  },
  {
    name: 'password', label: 'Пароль', type: 'password', pattern: VALIDATION_PATTERNS.password, required: true
  },
];

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useAppSelector((state) => state.auth);
  const formAction = (data: TFormResponse) => {
    dispatch(signUp({data, redirectFn: () => navigate(ROUTES.HOME)}) as unknown as AnyAction);
  };
  return (
    <Block title="Вход">
      <Form initialData={initialFormData} onSubmit={formAction} loading={loading}>
        <Button type="submit">Зарегистритроваться</Button>
        <Link to={ROUTES.AUTH}>
          <Button view={EButtonView.transparent}>Войти</Button>
        </Link>
      </Form>
    </Block>
  );
}
