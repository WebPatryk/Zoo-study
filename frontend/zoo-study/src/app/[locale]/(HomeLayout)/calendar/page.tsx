import LatestEvents from '@/app/components/LatestEvents/LatestEvents';
import styles from './Calendar.module.scss';
export default async function Index() {
  const data = await getData();
  console.log(data);
  const targetCount = 12;

  // Calculate how many additional copies you need
  const numberOfCopies = targetCount - data.length;

  // Create an array to hold all the items, including additional copies
  const allItems = [...data];

  if (numberOfCopies > 0) {
    // Create additional copies of the existing data
    for (let i = 0; i < numberOfCopies; i++) {
      allItems.push(...data);
    }
  }
  return (
    <div className={styles.latestEvents}>
      <h3 className={styles.title}>The latest events 🎉</h3>
      <button className={styles.addNewEventButton}>Add new event</button>
      <div className={styles.lists}>
        {allItems.map((item: any) => {
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
