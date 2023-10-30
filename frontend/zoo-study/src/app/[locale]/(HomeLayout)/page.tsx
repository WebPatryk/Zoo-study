import styles from '@/app/[locale]/(HomeLayout)/Layout.module.scss';

import Greetings from '@/app/components/Greetings/Greetings';
import Events from '@/app/components/Events/Events';
import Feed from '@/app/components/Feed/Feed';
import Visitors from '@/app/components/Visitors/Visitors';

export default async function Index({ children, params: { locale } }) {
  const data = await getData();
  console.log(data);

  return (
    <main className={styles.main}>
      <div className={styles.navbar}></div>
      <Greetings />
      <Events eventsData={data} />
      <section style={{ display: 'flex' }}>
        <Feed />
        <Visitors />
      </section>
    </main>
  );
}

async function getData() {
  const res = await fetch('http://localhost:3001/events');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
