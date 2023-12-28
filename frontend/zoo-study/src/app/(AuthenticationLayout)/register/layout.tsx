import 'react-toastify/dist/ReactToastify.css';
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}
export default async function LocaleLayout({ children }) {
  return (
    <html>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
