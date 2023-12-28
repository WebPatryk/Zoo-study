'use client';

import type { NextPage } from 'next';
import Image from 'next/image';
import hand from '@/app/assets/images/hand.png';
import styles from './Greetings.module.scss';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Greetings: NextPage = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const getUserProfile = async () => {
      const email = localStorage.getItem('email');

      try {
        const response = await fetch(
          `http://localhost:3001/auth/user/${email}`
        );
        const responseData = await response.json();
        if (responseData) {
          setUser(responseData);
        } else {
          toast.error('Passed credentials are not correct :(', {
            position: 'bottom-right'
          });
        }
      } catch (error) {
        toast.error('Error!');
        console.error('Login failed', error);
      }
    };
    getUserProfile();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.userContent}>
        <Image src={hand} height={30} width={30} alt="icon" />
        <h1>Welcome {user && user.name}</h1>
      </div>
      <p className={styles.appDescription}>
        Help other animals in frontend buying food for them, taking part in
        events and much much more. Find a people whose share your passion to
        animals and spend time together.
      </p>
    </div>
  );
};

export default Greetings;
