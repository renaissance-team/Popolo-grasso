import React, {useState} from 'react';
import Input from '../Input/Input';
import s from './form.module.scss';

export type TField = {
  name: string;
  label?: string
  value?: string;
  type?: string;
  placeholder?: '';
};

export type TFormResponse = Record<string, string>;

interface IFormProps {
  initialData: TField[];
  children: React.ReactElement;
  onSubmit: (data: TFormResponse) => void;
}

const prepareFieldsData = (fields: TField[]): TFormResponse => fields
  .reduce((obj, prop) => ({...obj, [prop.name]: prop.value}), {});

export default function Form({initialData, children, onSubmit}: IFormProps) {
  const [fields, setFields] = useState(initialData);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>, name: TField['name']) => {
    setFields(
      fields.map((field) => (field.name === name
        ? {
          ...field,
          value: (event.target as HTMLInputElement).value,
        }
        : field)),
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // todo: input validation
    onSubmit(prepareFieldsData(fields));
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      {fields.map(({
        name, type, label, value,
      }) => (
        <Input
          key={name}
          name={name}
          label={label}
          type={type}
          value={value}
          onChange={(event) => handleInputChange(event, name)}
        />
      ))}
      {children}
    </form>
  );
}
