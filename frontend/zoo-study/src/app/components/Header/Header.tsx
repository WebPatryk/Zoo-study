'use client';

import type { NextPage } from 'next';
import styles from './Header.module.scss';
import {
  FaCog,
  FaRegBell,
  FaSignOutAlt,
  FaUser,
  FaUserCircle
} from 'react-icons/fa';
// import { useRouter,usePathname } from 'next-intl/client';
import { usePathname, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';

const Header: NextPage = () => {
  const { locale, push } = useRouter();
  const pathname = usePathname();
  // const router = useRouter();

  // const pathname = usePathname()
  const [language, setLanguage] = useState<string>(locale);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['OutsiteJWT']);
  const changeLanguage = (e: any) => {
    const lang = e.target.value;
    console.log(lang);

    // push(`$/{lang}`, undefined, { locale: lang });
    push(`/${lang}`);

    // router.push(pathname, { locale: lang });
    // setLanguage(e.target.value);
  };

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

  // const logout = async () => {
  //   // cookies.remove('OutsiteJWT');
  //   // removeCookie('OutsiteJWT');
  //   // document.cookie =
  //   //   'OutsiteJWT; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  //   // push('/login');
  //
  //   const response = await fetch('/api/auth/logout', {
  //     method: 'POST'
  //   });
  //
  //   const responseData = await response.json();
  //   console.log(responseData);
  //   if (responseData.message === 'Success!') {
  //     await push('/login');
  //   }
  // };
  console.log(new URL(window.location.href).origin);
  const logout = async () => {
    await localStorage.removeItem('access_token');
    await push('/login');
  };
  return (
    <div className={styles.container}>
      <div className={styles.userContainer} id="modal">
        <FaUserCircle className={styles.userLogo} />
        <p className={styles.userName} onClick={toggleOpenModal}>
          Thomas Anders
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
              {/*<Link*/}
              {/*  href={pathname.substring(0, 3) + '/settings'}*/}
              {/*  className={styles.useModalElement}*/}
              {/*>*/}
              {/*  <FaCog className={styles.bell} />*/}
              {/*  <p className={styles.a}>Settings</p>*/}
              {/*</Link>*/}
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
