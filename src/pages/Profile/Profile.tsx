import {TUserResponse} from '@/api/types';
import Avatar from '@/components/Avatar/Avatar';
import Block from '@/components/Block/Block';
import Button from '@/components/Button/Button';
import Form, {TFormResponse} from '@/components/Form/Form';
import {changeAvatar, changeUser} from '@/store/user/actions';
import {useAppSelector} from '@/utils';
import React, {ReactElement, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

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
  const dispatch = useDispatch();
  const {data: userData} = useAppSelector((state) => state.user);

  const [userFormData, setUserFormData] = useState(initialFormData);
  const [userAvatar, setUserAvatar] = useState<string>();

  useEffect(() => {
    if (userData) {
      const {avatar, ...formData} = userData;
      setUserFormData(
        userFormData.map((prop) => ({...prop, value: formData[prop.name as keyof Omit<TUserResponse, 'avatar'>]})),
      );
      setUserAvatar(avatar);
    }
  }, [userData]);

  const saveForm = (data: TFormResponse) => {
    dispatch(changeUser(data));
  };

  const changeAvatarHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files?.length) {
      const file = target.files[0];
      dispatch(changeAvatar(file));
    }
  };
  return (
    <Block title="Профиль">
      <Avatar value={userAvatar} onChange={changeAvatarHandler} />
      <Form initialData={userFormData} onSubmit={saveForm}>
        <Button type="submit">Сохранить</Button>
      </Form>
    </Block>
  );
}

export default Profile;
