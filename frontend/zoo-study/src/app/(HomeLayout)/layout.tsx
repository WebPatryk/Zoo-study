'use client';

// import { NextIntlClientProvider } from 'next-intl';
// import { notFound } from 'next/navigation';
// import Footer from "@/app/components/Footer/Footer";
// import Header from "@/app/components/Header/Header";
// import Navbar from "@/app/components/Navbar/Navbar";
// import styles from '@/app/[locale]/Layout.module.scss'
// // import  '../../../styles/global.css';
// import React from "react";
// import Layout from "@/app/components/layout/Layout";
// import { usePathname } from 'next/navigation';
//
//
// // export function generateStaticParams() {
// //   return [{ locale: 'en' }, { locale: 'de' }];
// // }
//
// export default async function LocaleLayout({ children, params: { locale } }) {
//   // const pathname = usePathname();
//   let messages;
//   try {
//     messages = (await import(`./messages/${locale}.json`)).default;
//   } catch (error) {
//     // notFound();
//   }
//
//   // console.log(pathname)
//   // const loginPage = [`/login`].includes(pathname);
//   // const registerPage = [`/register`].includes(pathname);
//
//   // const LayoutComponent = loginPage || registerPage ? React.Fragment : Layout;
//   const LayoutComponent = true ? React.Fragment : Layout;
//
//   return (
//     <html lang={locale}>
//     <LayoutComponent>
//       <body>
//         <NextIntlClientProvider locale={locale} messages={messages}>
//           <div className={styles.container}>
//             <Navbar />
//             <div className={styles.main}>
//               <Header />
//               <main>
//                 {children}
//                 <Footer />
//               </main>
//             </div>
//           </div>
//         </NextIntlClientProvider>
//       </body>
//     </LayoutComponent>
//     </html>
//   );
// }

import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import styles from '@/app/components/layout/Layout.module.scss';
import Navbar from '@/app/components/Navbar/Navbar';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function LocaleLayout({ children }) {
  const router = useRouter();
  const storedData = localStorage.getItem('access_token');

  useEffect(() => {
    if (!storedData) {
      // If access_token is not present, redirect to login
      router.push('/login');
    }
  }, [storedData, router]);

  if (!storedData) {
    return null; // Render nothing if redirecting
  }

  return (
    <html>
      <body suppressHydrationWarning={true}>
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
      </body>
    </html>
  );
}

// <div {...props}>
//     <div className={styles.container}>
//         <Navbar />
//         <div className={styles.main}>
//             <Header />
//             <main>
//                 {children}
//                 <Footer />
//             </main>
//         </div>
//     </div>
// </div>
