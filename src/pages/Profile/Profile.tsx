import {TUserResponse} from '@/api/types';
import Block from '@/components/Block/Block';
import Button from '@/components/Button/Button';
import Form, {TFormResponse} from '@/components/Form/Form';
import userController from '@/controllers/user-controller';
import React, {ReactElement, useEffect, useState} from 'react';
import authController from '../../controllers/auth-controller';

const initialFormData = [
  {name: 'email', label: 'Почта', type: 'email'},
  {name: 'display_name', label: 'Отображаемое имя'},
  {name: 'login', label: 'Логин'},
  {name: 'first_name', label: 'Имя'},
  {name: 'second_name', label: 'Фамилия'},
  {name: 'phone', label: 'Телефон', type: 'tel'},
  {name: 'password', label: 'Пароль', type: 'password'},
];

function Profile(): ReactElement {
  const [userData, setUserData] = useState(initialFormData);

  useEffect(() => {
    const getUser = async () => {
      const response = await authController.getUser();
      if (response?.data) {
        setUserData(
          userData.map((prop) => ({...prop, value: response.data[prop.name as keyof TUserResponse]})),
        );
      }
    };
    getUser();
  }, []);

  const saveForm = (data: TFormResponse) => {
    userController.changeUser(data);
  };

  return (
    <Block title="Профиль">
      <Form initialData={userData} onSubmit={saveForm}>
        <Button type="submit">Войти</Button>
      </Form>
    </Block>
  );
}

export default Profile;
