import React, {ReactElement} from 'react';

import {Link} from 'react-router-dom';
import {useAppSelector} from '@/utils';
import arrowKeys from '@/assets/images/arrow-keys.png';
import Button from '../../components/Button/Button';
import {ROUTES} from '../consts';

import styles from './home.module.scss';

function Home(): ReactElement {
  const {isAuth} = useAppSelector((state) => state.auth);

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.content}>
          <h2>
            Добро пожаловать в
            {' '}
            <span>Popolo grasso!</span>
          </h2>
          <p>
            Двухмерный динамический раннер с возможностью одиночной или многопользовательской игры.
            <br />
            Главный герой (герои) игры движется вперёд из левой части экрана в правую по бесконечной &quot;дороге&quot;,
            изменяет свою скорость, перепрыгивает или перелетает (планирует) &quot;препятствия&quot;.
            <br />
            &quot;Дорогой&quot; для героя являются крыши-купола зданий, &quot;препятствиями&quot;
            являтся другие герои и летающие существа. Игрок набирает очки по мере продвижения персонажа
            по &quot;догоре&quot; и теряет очки при пересечении с &quot;препятствиями&quot;.
          </p>
          <div className={styles.arrowKeys}>
            Подпрыгнуть
            <div>
              <span>Влево</span>
              <img src={arrowKeys} alt="arrow keys" width={150} />
              <span>Вправо</span>
            </div>

          </div>

        </div>
        <div className={styles.controls}>
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
    </div>
  );
}

export default Home;
