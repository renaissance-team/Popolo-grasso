import React from 'react';
import {Link} from 'react-router-dom';
import authController from '../../controllers/auth-controller';
import Button, {EButtonView} from '../../components/Button/Button';
import {ROUTES} from '../consts';
import Login from './Login';
import {TFormResponse} from '../../components/Form/Form';

const initialFormData = [
  {name: 'login', label: 'Логин'},
  {name: 'password', label: 'Пароль', type: 'password'},
];

export default function Auth() {
  return Login({
    title: 'Вход',
    formAction: (data: TFormResponse) => {
      authController.signIn(data);
    },
    initialFormData,
    controls: (
      <>
        <Button type="submit">Войти</Button>
        <Link to={ROUTES.REGISTRATION}>
          <Button view={EButtonView.transparent}>Зарегистритроваться</Button>
        </Link>
      </>
    ),
  });
}
