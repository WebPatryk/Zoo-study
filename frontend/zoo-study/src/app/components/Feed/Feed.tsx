'use client';
import type { NextPage } from 'next';
import styles from './Feed.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { IoTicket } from 'react-icons/io5';
import fewPeople from '@/app/assets/images/small-people.jpg';
import mediumPeople from '@/app/assets/images/medium-people.jpg';
import manyPeople from '@/app/assets/images/many-people.jpg';
import { useEffect, useState } from 'react';

const Feed: NextPage = () => {
  const [ticketsSold, setTicketsSold] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('http://localhost:3001/tickets-sold');

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      console.log(data);
      setTicketsSold(data);
    };

    fetchEvents();
  }, [ticketsSold.length]);

  const people = [
    { id: 0, image: fewPeople },
    { id: 1, image: mediumPeople },
    { id: 2, image: manyPeople }
  ];

  const showPeopleImage = value => {
    switch (true) {
      case value <= 2000:
        return people[0].image.src;
      case value <= 5000:
        return people[1].image.src;
      case value <= 10000:
        return people[2].image.src;
      default:
        return null;
    }
  };

  // @ts-ignore
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Visited zoo</h3>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true
        }}
        grabCursor={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className="mySwiper"
        navigation={true}
        keyboard={true}
        style={{ margin: 0 }}
        autoplay={true}
      >
        {ticketsSold.map((data, i) => (
          <SwiperSlide
            key={data.date}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <img
              src={showPeopleImage(data.count)}
              alt="Logo"
              style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
            />
            <div className={styles.feedTicket}>
              <div>
                <IoTicket />
                <p>
                  <b>{data.count} / msc</b>
                  <span>Sold</span>
                </p>
              </div>
              <p className={styles.date}>
                {new Date(data.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}
              </p>
              {data.count > 5000 ? (
                <BiChevronUp color="green" />
              ) : (
                <BiChevronDown color="red" />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Feed;
