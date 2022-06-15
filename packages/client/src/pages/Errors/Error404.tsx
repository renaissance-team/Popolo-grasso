import React, {ReactElement} from 'react';
import ErrorPage from './ErrorPage';

function Error404(): ReactElement {
  return (
    <ErrorPage code={404} message="Упс... Такая страница не существует." />
  );
}

export default Error404;
