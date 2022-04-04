import {TUserResponse} from '@/api/types';
import Block from '@/components/Block/Block';
import Button from '@/components/Button/Button';
import Form from '@/components/Form/Form';
import React, {ReactElement, useEffect, useState} from 'react';
import authController from '../../controllers/auth-controller';
// import s from './profile.module.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const objToFormData = ({id, ...data}: TUserResponse) => Object.entries(data)
  .map(([name, value]) => ({name, value, label: name}));

function Profile(): ReactElement {
  const [userData, setUserData] = useState<TUserResponse>();

  useEffect(() => {
    const getUser = async () => {
      const response = await authController.getUser();
      setUserData(response?.data);
    };
    getUser();
  }, []);

  const saveForm = () => {

  };

  return (
    <Block title="Профиль">
      {userData && (
        <Form initialData={objToFormData(userData)} onSubmit={saveForm}>
          <Button type="submit">Войти</Button>
        </Form>
      )}
    </Block>
  );
}

export default Profile;
