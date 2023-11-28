'use client';

import type { NextPage } from 'next';
import styles from './Navbar.module.scss';
import contactImage from '@/app/assets/images/contact-image.svg';
import Image from 'next/image';
import Icon from '@/app/assets/icons/logo.png';
import Home from '@/app/assets/icons/home.svg';
import CalendarBasic from '@/app/assets/icons/calendar-basic.svg';
import Paw from '@/app/assets/icons/paw.svg';
import Ticket from '@/app/assets/icons/ticket.png';
import Chat from '@/app/assets/icons/chat.svg';
import { FaArrowRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import shpaeee from '../public/navbar-shape.svg';

interface Navigation {
  icon: SVGAElement;
  label: string;
}

const navigation = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: CalendarBasic, label: 'Events', href: '/calendar' },
  // { icon: Paw, label: 'Feed animals', href: '/feed-animals' },
  // { icon: Chat, label: 'Chat', href: '/chat' },
  { icon: Ticket, label: 'Ticket', href: '/ticket' }
];

const Navbar: NextPage = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [currentURL, setCurrentURL] = useState();

  useEffect(() => {
    if (window) {
      const currentURL = new URL(window.location.href).origin;
      setCurrentURL(currentURL as any);

      // host (domain)
      const host = currentURL.host;
      console.log('Host:', host);

      // path (path dari URL)
      const path = currentURL.pathname;
      console.log('Path:', path);

      // query (parameter dari URL)
      const query = currentURL.search;
      console.log('Query:', query);
    }
  }, []);
  // console.log(pathname.href);
  // const currentURL = new URL(window.location.href);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });
  let navbarClasses = ['navbar'];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }

  const contentClassname = (item: any) => {
    // console.log('PATHNAME', pathname.substring(3))
    // console.log("ITEM",item.href)
    return item.href === pathname ? `${styles['selected']} ${styles.li}` : '';
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src={Icon} height={100} width={100} alt="icon" />
      </div>
      <div style={{ width: '101%' }}>
        <ul className={styles.list}>
          {navigation.map(item => (
            <li
              key={item.label}
              className={contentClassname(item)}
              onClick={() => {
                // setSelectedTab(item.href);
              }}
            >
              <Link
                className={styles.link}
                href={currentURL + '/' + item.href.substring(1)}
              >
                <Image src={item.icon} height={30} width={30} alt="icon" />
                <p>{item.label}</p>

                {item.href === pathname ? (
                  <motion.div
                    className={styles.underline}
                    layoutId="underline"
                  />
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.contactContainer}>
        <div className={styles.contactImage}>
          <Image src={contactImage} alt="icon" />
        </div>
        <h4>Contact with us</h4>
        <p>Please take a note to is if you have any questions?</p>
        <i>zoo-portal@gmail.com</i>
      </div>
    </div>
  );
};

export default Navbar;
