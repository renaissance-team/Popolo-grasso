import {TUserResponse} from '@/api/types';
import Avatar from '@/components/Avatar/Avatar';
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
  {name: 'oldPassword', label: 'Старый пароль', type: 'password'},
  {name: 'newPassword', label: 'Новый пароль', type: 'password'},
];

function Profile(): ReactElement {
  const [userFormData, setUserFormData] = useState(initialFormData);
  const [userAvatar, setUserAvatar] = useState<string>();

  useEffect(() => {
    const getUser = async () => {
      const userResponse = await authController.getUser();
      if (userResponse?.data) {
        const {avatar, ...formData} = userResponse.data;
        setUserFormData(
          userFormData.map((prop) => ({...prop, value: formData[prop.name as keyof Omit<TUserResponse, 'avatar'>]})),
        );
        setUserAvatar(avatar);
      }
    };
    getUser();
  }, []);

  const saveForm = (data: TFormResponse) => {
    userController.changeUser(data);
  };

  const changeAvatar = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files?.length) {
      const file = target.files[0];
      userController.changeAvatar(file);
    }
  };

  return (
    <Block title="Профиль">
      <Avatar value={userAvatar} onChange={changeAvatar} />
      <Form initialData={userFormData} onSubmit={saveForm}>
        <Button type="submit">Сохранить</Button>
      </Form>
    </Block>
  );
}

export default Profile;
