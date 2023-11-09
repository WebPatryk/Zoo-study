'use client';

import { useCallback, useState } from 'react';
import BasicProfile from '@/app/components/BasicProfile/BasicProfile';
import DaysOff from '@/app/components/DaysOff/DaysOff';

const Index = () => {
  const [page, setPage] = useState('basic');

  const renderComponent = useCallback(() => {
    switch (page) {
      case 'basic':
        return <BasicProfile />;
        break;
      case 'days_off':
        return <DaysOff />;
        break;
      default:
        return null;
    }
  }, [page]);

  return (
    <div>
      <h5>Profile</h5>

      <div>
        <button onClick={() => setPage('basic')}>Basic</button>
        <button onClick={() => setPage('days_off')}>Days off</button>
        {renderComponent()}
      </div>
    </div>
  );
};

export default Index;
