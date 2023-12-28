'use client';

import type { NextPage } from 'next';
import styles from './Header.module.scss';
import { FaSignOutAlt, FaUser, FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';

const Header: NextPage = () => {
  const { push } = useRouter();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [user, setUser] = useState(null);

  const toggleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const modal = document.querySelector('#modal');

      if (modal && !modal.contains(target) && isOpenModal) {
        setIsOpenModal(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpenModal]);

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

  const logout = async () => {
    await localStorage.removeItem('access_token');
    await localStorage.removeItem('email');
    await localStorage.removeItem('app-user-id');
    await push('/login');
  };
  return (
    <div className={styles.container}>
      <div className={styles.userContainer} id="modal">
        <FaUserCircle className={styles.userLogo} />
        <p className={styles.userName} onClick={toggleOpenModal}>
          {user && user.name}
        </p>
        {isOpenModal && (
          <div className={styles.userModal}>
            <div>
              <Link
                href={new URL(window.location.href).origin + '/profile'}
                className={styles.useModalElement}
              >
                <FaUser className={styles.bell} />
                <p className={styles.a}>Profile</p>
              </Link>
              <Link
                href="/"
                className={styles.useModalElement}
                onClick={logout}
              >
                <FaSignOutAlt className={styles.bell} />
                <p className={styles.a}>Logout</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
