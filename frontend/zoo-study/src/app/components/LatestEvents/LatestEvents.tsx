'use client';

import styles from './LatestEvents.module.scss';
import Link from 'next/link';
import Event from '@/app/components/Event/Event';

interface EventInterface {
  _id: string;
  title: string;
  description: string;
  starts_at: Date;
  image: string;
  localization: string;
}

const LatestEvents = ({ title }: { title: string }) => {
  return (
    <div className={styles.latestEvents}>
      <h4 className={styles.time}>
        43:21 <span>left</span>
      </h4>
      <div className={styles.eventContainer}>
        <div>
          <div className={styles.party}>
            <div>
              <p>Open party</p>
              <h6>{title}</h6>
            </div>
            <img
              src="https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png"
              alt=""
            />
          </div>
          <div className={styles.information}>
            <div>
              <img
                src="https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png"
                alt=""
              />
              <p>21.04.2021</p>
            </div>
            <div>
              <img
                src="https://iconutopia.com/wp-content/uploads/2016/06/space-dog-laika1.png"
                alt=""
              />
              <p>7am - 15am</p>
            </div>
          </div>
          <div>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
              consequuntur debitis dicta eius, eum maxime neque non sapiente
              tenetur veritatis? Amet eius expedita ipsum repellendus saepe
              voluptas, voluptates. Dolores, nam.
            </p>
            <div>
              <button>Read more</button>
              <p>
                Status <span>Signed</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Link href="/calendar" className={styles.link}>
        {/*Show more <FaAngleRight />*/}
      </Link>
    </div>
  );
};

export default LatestEvents;