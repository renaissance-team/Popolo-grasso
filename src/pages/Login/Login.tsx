import React, {ReactElement} from 'react';
import Form, {TField, TFormResponse} from '../../components/Form/Form';
import s from './login.module.scss';

interface ILogin {
  title: string;
  formAction: (data: TFormResponse) => void;
  initialFormData: TField[];
  controls: ReactElement;
}

export default function Login({
  title, formAction, initialFormData, controls,
}: ILogin): ReactElement {
  return (
    <div className={s.login}>
      <h1 className={s.title}>{title}</h1>
      <Form initialData={initialFormData} onSubmit={formAction}>
        <div className={s.controls}>{controls}</div>
      </Form>
    </div>
  );
}
