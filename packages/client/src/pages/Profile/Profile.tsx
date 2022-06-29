import {TUserResponse} from '@/api/types';
import {AnyAction} from 'redux';
import Avatar from '@/components/Avatar/Avatar';
import Block from '@/components/Block/Block';
import Button from '@/components/Button/Button';
import {changeUser} from '@/store/user/actions';
import {useAppSelector} from '@/utils';
import React, {ReactElement, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {VALIDATION_PATTERNS} from '@/components/Form/consts';
import Form, {TFormResponse} from '../../components/Form/Form';

const initialFormData = [
  {
    name: 'email',
    label: 'Почта',
    type: 'email',
    pattern: VALIDATION_PATTERNS.email,
    required: true,
  },
  {
    name: 'display_name', label: 'Отображаемое имя', pattern: VALIDATION_PATTERNS.name, required: true
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
    name: 'phone',
    label: 'Телефон',
    type: 'tel',
    pattern: VALIDATION_PATTERNS.phone,
    required: true,
  },
  {
    name: 'oldPassword',
    label: 'Старый пароль',
    type: 'password',
    pattern: VALIDATION_PATTERNS.password,
  },
  {
    name: 'newPassword',
    label: 'Новый пароль',
    type: 'password',
    pattern: VALIDATION_PATTERNS.password,
  },
];

function Profile(): ReactElement {
  const dispatch = useDispatch();
  const {data: userData, loading} = useAppSelector((state) => state.user);

  const [userFormData, setUserFormData] = useState(initialFormData);
  const [userAvatar, setUserAvatar] = useState<string>();

  useEffect(() => {
    if (userData) {
      const {avatar, ...formData} = userData;
      setUserFormData(
        userFormData.map((prop) => ({...prop, value: formData[prop.name as keyof Omit<TUserResponse, 'avatar'>]}))
      );
      setUserAvatar(avatar);
    }
  }, [userData]);

  const saveForm = (data: TFormResponse) => {
    dispatch(changeUser(data) as unknown as AnyAction);
  };

  return (
    <Block title="Профиль">
      <Avatar
        value={userAvatar}
      />
      <Form initialData={userFormData} onSubmit={saveForm} loading={loading}>
        <Button type="submit">Сохранить</Button>
      </Form>
    </Block>
  );
}

export default Profile;
