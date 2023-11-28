'use client';

import React, { useEffect, useState } from 'react'; // Import React and other necessary dependencies
import LatestEvents from '@/app/components/LatestEvents/LatestEvents';
import styles from './Calendar.module.scss';
import Modal, { useModal } from '@/app/hooks/modal/useModal';
import { NextPage } from 'next';
import { FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@hookform/error-message';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import { MdOutlineSecurityUpdate } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function Index() {
  const [resData, setResData] = useState([]); // Use state to store your data
  const [numberOfCopies, setNumberOfCopies] = useState(0);
  const { isOpen, close, data, open } = useModal();

  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  // console.log(watch('name')); // watch input value by passing the name of it

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  type Inputs = {
    name: string;
    description: string;
    localization: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    let newValueToSubmit = {};
    if (!('image' in data)) {
      newValueToSubmit = {
        ...data,
        image:
          'https://dogbarstpete.com/wp-content/uploads/2020/01/BirthdayDogs.png'
      };
    }
    console.log(newValueToSubmit);

    const addEvent = async () => {
      console.log(data);
      try {
        const res = await fetch(`http://localhost:3001/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newValueToSubmit)
        });
        const values = await res.json();
        setEvents([...events, values]);
        close();
        toast.success('Event added successfully', {
          position: 'bottom-right',
          autoClose: 5000
        });

        console.log(values);
        console.log('Event added successfully');
      } catch (error) {
        console.error('Error added event:', error);
      }
    };
    addEvent();
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('http://localhost:3001/events');

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setEvents(data);
    };

    fetchEvents();
  }, [events.length]);

  return (
    <div className={styles.latestEvents} style={{ marginLeft: 30 }}>
      <h3 className={styles.title}>The latest events 🎉</h3>
      <button className={styles.addNewEventButton} onClick={open}>
        Add new event
      </button>
      <div className={styles.lists}>
        {events &&
          events.map((item, index) => (
            <LatestEvents
              key={index}
              {...item}
              events={events}
              setEvents={setEvents}
            />
          ))}
      </div>
      {isOpen() && (
        <Modal
          title="Add new event"
          buttons={{
            close: {
              label: 'Close',
              onClick() {
                close();
              }
            }
          }}
        >
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <input
              type="text"
              placeholder="Name"
              className={styles.input}
              {...register('title', {
                required: 'Title is required',
                minLength: {
                  value: 3,
                  message: 'Title is too short'
                },
                maxLength: {
                  value: 40,
                  message: 'Title is too long'
                }
              })}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              as="p"
              className={styles.error}
            />

            <input
              type="text"
              placeholder="Description"
              className={styles.input}
              {...register('description', {
                required: 'Description is required',
                minLength: {
                  value: 3,
                  message: 'Description is too short'
                },
                maxLength: {
                  value: 40,
                  message: 'Description is too long'
                }
              })}
            />
            <ErrorMessage
              errors={errors}
              name="description"
              as="p"
              className={styles.error}
            />

            <input
              type="text"
              placeholder="Localization"
              className={styles.input}
              {...register('localization', {
                required: 'Localization is required',
                minLength: {
                  value: 3,
                  message: 'Localization is too short'
                },
                maxLength: {
                  value: 40,
                  message: 'Localization is too long'
                }
              })}
            />
            <ErrorMessage
              errors={errors}
              name="localization"
              as="p"
              className={styles.error}
            />
            <div>
              <label htmlFor="starts_at" className={styles.label}>
                Start event date:
              </label>
              <input
                id="starts_at"
                type="date"
                placeholder="Start date"
                className={styles.select}
                min={new Date().toISOString().split('T')[0]}
                {...register('starts_at' as FieldPath<undefined>, {
                  required: 'Start date is required',
                  minLength: {
                    value: 3,
                    message: 'Start date is too short'
                  },
                  maxLength: {
                    value: 40,
                    message: 'Start date is too long'
                  }
                })}
              />
            </div>

            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}
