import '@/../styles/global.css';
export default async function LocaleLayout({ children }) {
  return (
    <html>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
