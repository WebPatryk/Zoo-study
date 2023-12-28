'use client';

import styles from '@/app/components/layout/Layout.module.scss';
import Navbar from '@/app/components/Navbar/Navbar';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function LocaleLayout({ children }) {
  const router = useRouter();
  const storedData = localStorage.getItem('access_token');

  useEffect(() => {
    if (!storedData) {
      router.push('/login');
    }
  }, [storedData, router]);

  if (!storedData) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div>
        <Header />
        <main className={styles.main}>
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}
