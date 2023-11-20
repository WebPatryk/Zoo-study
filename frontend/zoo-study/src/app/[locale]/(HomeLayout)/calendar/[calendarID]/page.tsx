'use client';

import styles from './CalendarId.module.scss';
import { FaClock, FaLocationArrow, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
export default function Index({}) {
  const router = useParams();

  const [data, setData] = useState([]);

  console.log(router);

  useEffect(() => {
    async function fetchEvent() {
      const res = await fetch(
        `http://localhost:3001/events/${router.calendarID}`
      );
      const event = await res.json();

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      setData(event);
    }
    fetchEvent();
  }, [router.calendarID]);
  // const data = await getDataByEventId(eventId);
  // 637e250c9a5d0e2fd784c42a
  return (
    <section className={styles.eventId}>
      <div>
        <h2 className={styles.title}>{data.title}</h2>

        <div className={styles.container}>
          <div className="left">
            <div className={styles.box}>
              <FaLocationArrow />
              <span>Address</span>
            </div>
            <p style={{ marginTop: '1rem' }}>{data.localization}</p>
            <div className={styles.container}>
              <div className={styles.box}>
                <FaClock />
                <p>Time</p>
              </div>
            </div>
            <p style={{ marginTop: '1rem' }}>
              {data.starts_at &&
                new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }).format(new Date(data.starts_at) * 1000)}
            </p>
            <div>
              <h5 className={styles.subtitle}>Event Description</h5>
              <p className={styles.description}>{data.description}</p>
            </div>
          </div>
          <div className="right">
            <h5 className={styles.subtitle}>Event photos</h5>
            <img src={data.image} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
// async function getDataByEventId(id: string): Promise<any> {
//   // const id = '637e250c9a5d0e2fd784c42a';
//   const res = await fetch(`http://localhost:3001/events/${id}`);
//   const event = res.json();
//
//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//
//   return event;
// }
// export const generateStaticParams = async () => {
//   const data = await fetch('http://localhost:3001/events');
//   const events = await data.json();
//
//   return events.map(event => ({
//     params: {
//       eventId: event._id.toString()
//     }
//   }));
// };
