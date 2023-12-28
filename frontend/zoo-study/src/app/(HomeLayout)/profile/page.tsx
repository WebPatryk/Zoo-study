'use client';

import { useCallback, useEffect, useState } from 'react';
import BasicProfile from '@/app/components/BasicProfile/BasicProfile';
import DaysOff from '@/app/components/DaysOff/DaysOff';
import styles from './Profile.module.scss';

const Index = () => {
  const [page, setPage] = useState('basic');
  const [profileData, setProfileData] = useState([]);
  const [newData, setNewData] = useState(1);

  const fetchUserData = async () => {
    const email = localStorage.getItem('email');
    try {
      const response = await fetch(
        `http://localhost:3001/app-users/details/${email}`
      );
      const userData = await response.json();
      await localStorage.setItem('app-user-id', userData._id);
      setProfileData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const renderComponent = useCallback(() => {
    switch (page) {
      case 'basic':
        return <BasicProfile profileData={profileData} />;
        break;
      case 'days_off':
        return (
          <DaysOff
            profileData={profileData}
            setProfileData={setProfileData}
            setNewData={setNewData}
            newData={newData}
          />
        );
        break;
      default:
        return null;
    }
  }, [profileData.length, page, newData, profileData[0]]);

  return (
    <div className={styles.profile} style={{ marginLeft: 30 }}>
      <h5 className={styles.title}>Profile</h5>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${page === 'basic' ? styles.active : ''}`}
          onClick={() => setPage('basic')}
        >
          Basic
        </button>
        <button
          className={`${styles.tab} ${
            page === 'days_off' ? styles.active : ''
          }`}
          onClick={() => setPage('days_off')}
        >
          Days off
        </button>
      </div>
      {renderComponent()}
    </div>
  );
};

export default Index;
