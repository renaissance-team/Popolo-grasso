import React from 'react';
import {Link} from 'react-router-dom';
import {TFormResponse} from '../../components/Form/Form';
import authController from '../../controllers/auth';
import Button, {EButtonView} from '../../components/Button/Button';
import {ROUTES} from '../consts';
import Login from './Login';

const initialFormData = [
  {name: 'email', label: 'Почта', type: 'email'},
  {name: 'login', label: 'Логин'},
  {name: 'first_name', label: 'Имя'},
  {name: 'second_name', label: 'Фамилия'},
  {name: 'phone', label: 'Телефон', type: 'tel'},
  {name: 'password', label: 'Пароль', type: 'password'},
];

export default function Register() {
  return Login({
    title: 'Регистрация',
    formAction: (data: TFormResponse) => {
      authController.signUp(data);
    },
    initialFormData,
    controls: (
      <>
        <Button type="submit">Зарегистритроваться</Button>
        <Link to={ROUTES.AUTH}>
          <Button view={EButtonView.transparent}>Войти</Button>
        </Link>
      </>
    ),
  });
}
