import React from 'react';
import {Link} from 'react-router-dom';
import Block from '@/components/Block/Block';
import Form, {TFormResponse} from '../../components/Form/Form';
import authController from '../../controllers/auth-controller';
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
  const formAction = (data: TFormResponse) => {
    authController.signUp(data);
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
