'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import styles from './DaysOff.module.scss';
import { BiParty } from 'react-icons/bi';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BsEmojiSunglasses } from 'react-icons/bs';

const DaysOff = () => {
  return (
    <>
      <div className={styles.daysOff}>
        <h4 className={styles.title}>Main information</h4>

        <div className={styles.daysOffContainer}>
          <div className={styles.box}>
            <div className={styles.headBox}>
              <BsEmojiSunglasses />
              <p>Paid Leave</p>
            </div>

            <h4>12/12</h4>
            <span>Currently available</span>
          </div>
          <div className={styles.box}>
            <div className={styles.headBox}>
              <BiParty />
              <p>Vaccation Leave</p>
            </div>

            <h4>12/12</h4>
            <span>Currently available</span>
          </div>
          <div className={styles.box}>
            <div className={styles.headBox}>
              <HiOutlineDocumentText />
              <p>Comp-Off Leave</p>
            </div>

            <h4>12/12</h4>
            <span>Currently available</span>
          </div>
          <div className={styles.box}>
            <div className={styles.headBox}>
              <AiOutlineCloudUpload />
              <p>Upload Leave</p>
            </div>

            <h4>12/12</h4>
            <span>Currently available</span>
          </div>
        </div>
      </div>

      <div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={[
            { title: 'event 1', date: '2019-04-01' },
            { title: 'event 2', date: '2019-04-02' }
          ]}
        />
      </div>
    </>
  );
};

export default DaysOff;
