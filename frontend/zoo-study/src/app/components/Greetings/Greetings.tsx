'use client';

import type { NextPage } from 'next';
import Image from 'next/image';
import hand from '@/app/assets/images/hand.png';
import styles from './Greetings.module.scss';
import {useTranslations} from 'next-intl';

const Greetings: NextPage = () => {
  const user = 'Patryk';

  const t = useTranslations('Index');

  return (
    <div className={styles.wrapper}>
      <div className={styles.userContent}>
        <Image src={hand} height={30} width={30} alt="icon" />
        <h1>
          {t('title')} {user}
        </h1>
      </div>
      <p className={styles.appDescription}>{t('description')}</p>
    </div>
  );
};

export default Greetings;
