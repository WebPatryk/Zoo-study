'use client';
import type { NextPage } from 'next';
import styles from './Feed.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper';
import CustomProgressBar from '../utils/components/ProgressBar/CustomProgressBar';
import { BsFillTicketDetailedFill, BsTicket } from 'react-icons/bs';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { IoTicket } from 'react-icons/io5';
import { GiTick, GiTicket } from 'react-icons/gi';
import { FaTicketAlt } from 'react-icons/fa';
import { FaTicketSimple } from 'react-icons/fa6';
import fewPeople from '@/app/assets/images/small-people.jpg';
import mediumPeople from '@/app/assets/images/medium-people.jpg';
import manyPeople from '@/app/assets/images/many-people.jpg';
import { show } from 'dom7';

const Feed: NextPage = () => {
  const defaultData = [
    {
      id: 0,
      thumbnail:
        'https://dogbarstpete.com/wp-content/uploads/2020/01/BirthdayDogs.png',
      progress: {
        title: "Dog's party at park",
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis erat nisl, sit amet malesud...',
        in_progress: '25%'
      }
    },
    {
      id: 1,
      thumbnail:
        'https://dogbarstpete.com/wp-content/uploads/2020/01/BirthdayDogs.png',
      progress: {
        title: "Azors's party at somewhere",
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis erat nisl, sit amet malesud...',
        in_progress: '90%'
      }
    },
    {
      id: 2,
      thumbnail:
        'https://dogbarstpete.com/wp-content/uploads/2020/01/BirthdayDogs.png',
      progress: {
        title: 'Save money',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis erat nisl, sit amet malesud...',
        in_progress: '55%'
      }
    }
  ];
  // { icon: Chat, label: 'Chat', href: '/chat' },
  const people = [
    { id: 0, image: fewPeople },
    { id: 1, image: mediumPeople },
    { id: 2, image: manyPeople }
  ];

  const showPeopleImage = value => {
    value = 15000;
    switch (true) {
      case value < 10000:
        return people[0].image.src;
      case value < 20000:
        return people[1].image.src;
      case value < 30000:
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
        {defaultData.map((data, i) => (
          <SwiperSlide
            key={data.id}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {/*<img*/}
            {/*  src={data.thumbnail}*/}
            {/*  height={100}*/}
            {/*  width={100}*/}
            {/*  style={{ objectFit: 'cover', borderRadius: '50%' }}*/}
            {/*/>*/}
            {/*<CustomProgressBar progress={data.progress} />*/}
            {/*<img src={fewPeople} alt={people[i].id} />*/}
            <img
              src={showPeopleImage(5000)}
              alt="Logo"
              style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
            />
            <div className={styles.feedTicket}>
              <div>
                <IoTicket />
                <p>
                  <b>88 000 / msc</b>
                  <span>Sold</span>
                </p>
              </div>
              {true > 1000 ? <BiChevronUp /> : <BiChevronDown />}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Feed;
