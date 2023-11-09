'use client';

import React, { useEffect, useState } from 'react'; // Import React and other necessary dependencies
import LatestEvents from '@/app/components/LatestEvents/LatestEvents';
import styles from './Calendar.module.scss';
import Modal, { useModal } from '@/app/hooks/modal/useModal';
import { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@hookform/error-message';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import Link from 'next/link';

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

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {};

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getData();
        setResData(response);
        const targetCount = 12;
        setNumberOfCopies(targetCount - response.length);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.latestEvents}>
      <h3 className={styles.title}>The latest events 🎉</h3>
      <button className={styles.addNewEventButton} onClick={open}>
        Add new event
      </button>
      <div className={styles.lists}>
        {/*{Array.from({ length: numberOfCopies + 1 }).map((_, index) => (*/}
        {/*  <LatestEvents key={index} {...resData[index % resData.length]} />*/}
        {/*))}*/}

        {resData &&
          resData.map((item, index) => <LatestEvents key={index} {...item} />)}
      </div>
      {isOpen() && (
        <Modal
          title="Add new event"
          buttons={{
            confirm: {
              label: 'Save',
              onClick() {
                close();
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
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <input
              type="text"
              placeholder="Name"
              className={styles.input}
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name is too short'
                },
                maxLength: {
                  value: 40,
                  message: 'Name is too long'
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

            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
        </Modal>
      )}
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
