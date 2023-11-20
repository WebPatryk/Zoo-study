'use client';

import styles from './LatestEvents.module.scss';
import Link from 'next/link';
import Event from '@/app/components/Event/Event';
import Calendar from '@/app/assets/icons/calendar.svg';
import Time from '@/app/assets/icons/time.svg';
import Paw from '@/app/assets/icons/paw.svg';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import Modal, { useModal } from '@/app/hooks/modal/useModal';
import QRCode from 'react-qr-code';
import React from 'react';

interface EventInterface {
  _id: string;
  title: string;
  description: string;
  starts_at: Date;
  image: string;
  localization: string;
}

const LatestEvents = ({
  _id,
  title,
  image,
  starts_at,
  events,
  setEvents
}: {
  title: string;
}) => {
  const { isOpen, close, data, open } = useModal();

  console.log(_id);
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
            <img src={image} alt="image" className={styles.avatar} />
          </div>
          <div className={styles.information}>
            <div className={styles.informationRow}>
              <Image src={Calendar} alt="icon" />
              <p>
                {starts_at &&
                  new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                  }).format(new Date(starts_at))}
              </p>
            </div>
            <div className={styles.informationRow}>
              <Image src={Time} alt="icon" />
              <p>
                {new Date(starts_at).toLocaleTimeString(undefined, {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </p>
            </div>
          </div>
          <div>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
              consequuntur debitis dicta eius, eum maxime neque non sapiente
              tenetur veritatis? Amet eius expedita ipsum repellendus saepe
              voluptas, voluptates. Dolores, nam.
            </p>
            <div className={styles.bottom}>
              <Link href={`calendar/${_id}`} className={styles.link}>
                Read more 🡢
              </Link>
              <button
                className={styles.removeButton}
                onClick={() => {
                  open({ _id, title });
                }}
              >
                <FaTrash className={styles.removeIcon} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Link href="/calendar" className={styles.link}></Link>
      {isOpen() && (
        <div id="printModal">
          <Modal
            title="Are you sure you want to remove it?"
            buttons={{
              confirm: {
                label: 'Remove',
                onClick() {
                  const removeEvent = async () => {
                    try {
                      const res = await fetch(
                        `http://localhost:3001/events/${_id}`,
                        {
                          method: 'DELETE',
                          headers: {
                            'Content-Type': 'application/json'
                          }
                        }
                      );
                      const values = await res.json();
                      setEvents(event => event._id !== events._id);

                      console.log(values);
                      console.log('Event removed successfully');
                    } catch (error) {
                      console.error('Error removing event:', error);
                    }
                  };
                  removeEvent();
                }
              },
              close: {
                label: 'Close',
                onClick() {
                  close();
                }
              }
            }}
          >
            <div className={styles.ticketPrint}>
              <p>
                Event id: <i>{data._id}</i>
              </p>
              <br />
              <p>
                Event name: <u>{data.title}</u>
              </p>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default LatestEvents;
