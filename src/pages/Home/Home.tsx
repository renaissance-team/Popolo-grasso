import React, {ReactElement} from 'react';
import '@/assets/images/motypest1-min.png';
import ReactMarkdown from 'react-markdown';

import {Link} from 'react-router-dom';
import Button from '../../components/Button/Button';
import Readme from '../../../README.md';
import {ROUTES} from '../consts';

import s from './home.module.scss';

function Home(): ReactElement {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <ReactMarkdown>{Readme}</ReactMarkdown>
      </div>
      <div className={s.controls}>
        <Link to={ROUTES.AUTH}>
          <Button>Войти</Button>
        </Link>
      </div>

    </div>
  );
}

export default Home;
