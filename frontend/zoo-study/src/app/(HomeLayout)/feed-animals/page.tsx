import styles from '@/app/(HomeLayout)/Layout.module.scss';
import Greetings from '@/app/components/Greetings/Greetings';
import Events from '@/app/components/Events/Events';
import Feed from '@/app/components/Feed/Feed';
import Visitors from '@/app/components/Visitors/Visitors';
import FilterFeedAnimalsForm from '@/app/components/Form/FilterFeedAnimalsForm';

export default async function Index() {
  const data = await getData();
  console.log(data);

  return (
    <main className={styles.main}>
      <FilterFeedAnimalsForm />
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
