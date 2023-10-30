import LatestEvents from '@/app/components/LatestEvents/LatestEvents';
import styles from './Calendar.module.scss';
export default async function Index() {
  const data = await getData();
  console.log(data);

  return (
    <div className={styles.latestEvents}>
      <h3 className={styles.title}>The latest events 🎉</h3>

      <div className={styles.lists}>
        {data.map((item: any) => {
          return <LatestEvents key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
}

async function getData() {
  const res = await fetch('http://localhost:3001/events');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
