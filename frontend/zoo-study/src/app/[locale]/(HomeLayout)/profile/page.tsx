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
    try {
      const response = await fetch(
        'http://localhost:3001/app-users/655561bf5fe23bfc08460153'
      );
      const userData = await response.json();
      setProfileData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []); // Empty dependency array ensures that it runs only once when the component mounts
  // }, [profileData[0], profileData.length, page, newData, profileData]); // Empty dependency array ensures that it runs only once when the component mounts

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
  }, [
    profileData.length,
    page,
    newData,
    profileData[0]
    // Object.values(profileData.map(item => item.daysOff))
  ]);

  return (
    <div className={styles.profile}>
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
