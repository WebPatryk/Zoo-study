import styles from '@/app/(HomeLayout)/Layout.module.scss';
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
