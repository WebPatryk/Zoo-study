'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import styles from './DaysOff.module.scss';
import { BiParty } from 'react-icons/bi';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { BsEmojiSunglasses } from 'react-icons/bs';
import Modal, { useModal } from '@/app/hooks/modal/useModal';
import React, { useEffect, useState } from 'react';
import { Controller, FieldPath, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const DaysOff = ({ profileData, setNewData, newData, setProfileData }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const { isOpen, close, data, open } = useModal();
  const [formData, setFormData] = useState(null); // State to store form data

  useEffect(() => {
    if (formData) {
      console.log(profileData);
      console.log('Form data changed:', formData);
      createUserDaysOff(formData);
    }
  }, [formData]);

  const onSubmit = async (data: any) => {
    setFormData(data);

    if (data) {
      console.log('Form data changed:', data);
      await createUserDaysOff(data);
      await createUserEventInCalendar(data);
    }
  };

  let availableName = '';
  const createUserDaysOff = async data => {
    if (!data) {
      console.error('Error: Some necessary data are missing in data');
      return;
    }

    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);
    const differenceInMilliseconds = endDate - startDate;
    const differenceInDays =
      differenceInMilliseconds / (1000 * 60 * 60 * 24) + 1;

    const nameMapping = {
      paidLeave: 'availablePaidLeave',
      vacationLeave: 'availableVacationLeave',
      compOffLeave: 'availableCompOffLeave'
    };

    if (nameMapping.hasOwnProperty(data.vacation)) {
      const name = nameMapping[data.vacation];
      availableName = name;
    }

    const date_values = {
      daysOff: {
        ...profileData.daysOff,
        [data.vacation]: differenceInDays,
        [nameMapping[data.vacation]]:
          profileData.daysOff[availableName] - differenceInDays
      }
    };
    const id = localStorage.getItem('app-user-id');

    try {
      const res = await fetch(`http://localhost:3001/app-users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(date_values)
      });
      const values = await res.json();
      setProfileData(values);
      setNewData(crypto.randomUUID());
      setFormData(null);

      console.log('User data uploaded successfully');
    } catch (error) {
      console.error('Error uploading user data:', error);
    }
  };

  const createUserEventInCalendar = async data => {
    if (!data) {
      console.error('Error: Some necessary data are missing in data');
      return;
    }

    const date_values = {
      title: data.title,
      start: data.start_date,
      end: data.end_date
    };
    const id = localStorage.getItem('app-user-id');
    try {
      const res = await fetch(
        `http://localhost:3001/app-users/${id}/add-event`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(date_values)
        }
      );
      const values = await res.json();
      setProfileData(values);
      setNewData(crypto.randomUUID());
      setFormData(null);

      console.log(values);
      console.log('User data uploaded successfully');
    } catch (error) {
      console.error('Error uploading user data:', error);
    }
  };

  const handleDateClick = arg => {
    alert(arg.dateStr);
  };

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

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

            <h4>{profileData.daysOff?.availablePaidLeave}/12</h4>
            <span>Currently available</span>
          </div>
          <div className={styles.box}>
            <div className={styles.headBox}>
              <BiParty />
              <p>Vaccation Leave</p>
            </div>

            <h4>{profileData.daysOff?.availableVacationLeave}/12</h4>
            <span>Currently available</span>
          </div>
          <div className={styles.box}>
            <div className={styles.headBox}>
              <HiOutlineDocumentText />
              <p>Comp-Off Leave</p>
            </div>

            <h4>{profileData.daysOff?.availableCompOffLeave}/12</h4>
            <span>Currently available</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', paddingRight: '2rem' }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          dateClick={handleDateClick}
          eventContent={renderEventContent}
          customButtons={{
            addEvent: {
              text: 'Add vacation',
              click: () => {
                open();
              }
            }
          }}
          headerToolbar={{
            start: 'today prev,next addEvent',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={profileData.calendarEvents}
        />

        {isOpen() && (
          <div id="printModal">
            <Modal
              title="Add new vacation"
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
                id="hook-form"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
                className={styles.daysOffForm}
              >
                <div className={styles.timeline}>
                  <label htmlFor="end">Days Off title:</label>
                  <input
                    type="text"
                    placeholder="Type your days off title"
                    className={styles.select}
                    {...register('title' as FieldPath<undefined>, {
                      required: 'Days Off title is required',
                      minLength: {
                        value: 3,
                        message: 'Days Off title  is too short'
                      },
                      maxLength: {
                        value: 140,
                        message: 'Days Off title  is too long'
                      }
                    })}
                  />
                </div>

                <Controller
                  name="vacation"
                  control={control}
                  rules={{ required: 'Vacation type is required' }}
                  render={({ field }: { field: any }) => (
                    <div style={{ margin: '3.5rem 0 .3rem 0' }}>
                      <label htmlFor="vacation">Vacation type:</label>
                      <select {...field} className={styles.select}>
                        <option value="">Select type of paid</option>
                        <option value="paidLeave">Paid Leave</option>
                        <option value="vaccationLeave">Vacation Leave</option>
                        <option value="compOffLeave">Camp-off Leave</option>
                      </select>
                    </div>
                  )}
                />

                <ErrorMessage
                  errors={errors}
                  name="zone"
                  as="p"
                  className={styles.error}
                />

                <div className={styles.timeline}>
                  <label htmlFor="start">Start date:</label>
                  <input
                    type="date"
                    placeholder="Start date"
                    className={styles.select}
                    min={new Date().toISOString().split('T')[0]}
                    {...register('start_date' as FieldPath<undefined>, {
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
                <div className={styles.timeline}>
                  <label htmlFor="end">End date:</label>
                  <input
                    type="date"
                    placeholder="End date"
                    className={styles.select}
                    min={new Date().toISOString().split('T')[0]}
                    {...register('end_date' as FieldPath<undefined>, {
                      required: 'End date is required',
                      minLength: {
                        value: 3,
                        message: 'End date is too short'
                      },
                      maxLength: {
                        value: 40,
                        message: 'End date is too long'
                      }
                    })}
                  />
                </div>
                <button type="submit" className={styles.button}>
                  Submit
                </button>
              </form>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
};

export default DaysOff;
