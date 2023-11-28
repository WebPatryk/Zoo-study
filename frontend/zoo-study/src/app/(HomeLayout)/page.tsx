import styles from '@/app/(HomeLayout)/Layout.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import Greetings from '@/app/components/Greetings/Greetings';
import Events from '@/app/components/Events/Events';
import Feed from '@/app/components/Feed/Feed';
import Visitors from '@/app/components/Visitors/Visitors';

export default async function Index({ children, params: { locale } }) {
  const events = await getEvents();
  const visitors = await getVisitors();
  console.log(visitors);

  return (
    <main className={styles.main} style={{ marginLeft: 30 }}>
      <div className={styles.navbar}></div>
      <Greetings />
      <Events eventsData={events} />
      <section style={{ display: 'flex' }}>
        <Feed />
        <Visitors visitorsData={visitors} />
      </section>
    </main>
  );
}

async function getEvents() {
  const res = await fetch('http://localhost:3001/events');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

async function getVisitors() {
  const res = await fetch('http://localhost:3001/visitors');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
