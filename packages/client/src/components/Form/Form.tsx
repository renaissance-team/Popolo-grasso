import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import type {ValidationRule} from 'react-hook-form';
import Input from '../Input/Input';
import {REQUIRED_ERROR_TEXT} from './consts';
import style from './form.module.scss';

export type TField = {
    name: string;
    label?: string;
    value?: string | number;
    type?: string;
    placeholder?: '';
    pattern?: ValidationRule<RegExp>,
    required?: boolean
  };

export type TFormResponse = Record<string, string | number>;

interface IFormProps {
  initialData: TField[];
  children: React.ReactElement | React.ReactElement[];
  loading?: boolean;
  onSubmit: (data: TFormResponse) => void;
}

const prepareFieldsData = (fields: TField[]): TFormResponse => fields
  .reduce((obj, prop) => ({...obj, [prop.name]: prop.value}), {});

export default function Form({
  initialData, children, loading, onSubmit
}: IFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: prepareFieldsData(initialData),
    mode: 'onBlur',
  });

  const [fields, setFields] = useState(initialData);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>, name: TField['name']) => {
    setFields(
      fields.map((field) => (field.name === name
        ? {
          ...field,
          value: (event.target as HTMLInputElement).value,
        }
        : field))
    );
  };

  useEffect(() => {
    setFields(initialData);
  }, [initialData]);

  useEffect(() => {
    reset(prepareFieldsData(initialData));
  }, [initialData, reset]);

  return (
    <form className={classNames(style.form, loading && style.form_loading)} onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({
        name, type, label, pattern, required
      }) => (
        <Input
          {...register(name, {
            ...(required && {required: REQUIRED_ERROR_TEXT}),
            pattern
          })}
          key={name}
          name={name}
          label={label}
          type={type}
          onChange={(event) => handleInputChange(event, name)}
          error={!!errors[name]}
          errorText={errors?.[name]?.message}
        />
      ))}
      <div className={style.controls}>{children}</div>
    </form>
  );
}
