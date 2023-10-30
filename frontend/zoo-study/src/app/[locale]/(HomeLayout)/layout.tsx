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

export default async function LocaleLayout({ children, params: { locale } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
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
        </NextIntlClientProvider>
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
