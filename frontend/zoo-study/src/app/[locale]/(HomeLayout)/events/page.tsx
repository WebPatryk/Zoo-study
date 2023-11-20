'use client';

import styles from '@/app/[locale]/(HomeLayout)/Layout.module.scss';

import FilterFeedAnimalsForm from '@/app/components/Form/FilterFeedAnimalsForm';
import { useEffect, useState } from 'react';

export default function Index() {
  const [events, setEvemts] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('http://localhost:3001/events');

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setEvemts(data);
    };

    fetchEvents();
  }, [events.length]);

  return (
    <main className={styles.main}>
      <h3>The latest events 🎉</h3>
    </main>
  );
}
