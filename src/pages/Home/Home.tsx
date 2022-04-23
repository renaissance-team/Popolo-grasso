import React, {ReactElement} from 'react';
import '@/assets/images/motypest1-min.png';
import ReactMarkdown from 'react-markdown';

import {Link} from 'react-router-dom';
import {useAppSelector} from '@/utils';
import Button from '../../components/Button/Button';
import Readme from '../../../README.md';
import {ROUTES} from '../consts';

import style from './home.module.scss';

function Home(): ReactElement {
  const {isAuth} = useAppSelector((state) => state.auth);

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <ReactMarkdown>{Readme}</ReactMarkdown>
      </div>
      <div className={style.controls}>
        {!isAuth ? (
          <Link to={ROUTES.AUTH}>
            <Button>Войти</Button>
          </Link>
        ) : (
          <Link to={ROUTES.GAME}>
            <Button>Играть</Button>
          </Link>
        )}
      </div>

    </div>
  );
}

export default Home;
