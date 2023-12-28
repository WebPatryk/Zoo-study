'use client';

import styles from './Events.module.scss';
import Event from '../Event/Event';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa';

interface EventInterface {
  _id: string;
  title: string;
  description: string;
  starts_at: Date;
  image: string;
  localization: string;
}

const Events = ({ eventsData }: { eventsData: EventInterface[] }) => {
  return (
    <div className={styles.events}>
      <h2 className={styles.title}>Upcoming Events</h2>

      <section>
        <div className={styles.eventContainer}>
          {eventsData.slice(0, 3).map(event => (
            <div key={event._id}>
              <Event {...event} />
            </div>
          ))}
        </div>
        <Link href="/calendar" className={styles.link}>
          Show more <FaAngleRight />
        </Link>
      </section>
    </div>
  );
};

export default Events;
