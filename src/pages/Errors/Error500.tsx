import React, {ReactElement} from 'react';
import ErrorPage from './ErrorPage';

type Error500PropsType = {
  resetErrorBoundary: (...args: Array<unknown>) => void;
};

function Error500({resetErrorBoundary}: Error500PropsType): ReactElement {
  return (
    <ErrorPage
      code={500}
      message="Мы уже знаем о проблеме и работаем над этим. Попробуйте перезагрузить страницу или зайти позже."
      onClick={resetErrorBoundary}
    />
  );
}

export default Error500;
