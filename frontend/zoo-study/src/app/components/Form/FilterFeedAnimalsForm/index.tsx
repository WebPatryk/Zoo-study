'use client';

import type { NextPage } from 'next';
import styles from './FilterFeedAnimalsForm.module.scss';
import { useState } from 'react';

const Index: NextPage = () => {
  const [status, setStatus] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');

  const handleChangeStatus = () => {};
  const handleSortBy = () => {};

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="">Time</label>
      </div>
      <div>
        <label htmlFor="">Sort By</label>
        <select name="" id="" onChange={handleSortBy} value={sortBy}>
          <option value="en">English</option>
          <option value="pl">Polish</option>
          <option value="de">Deutsch</option>
        </select>
      </div>
    </div>
  );
};

export default Index;
