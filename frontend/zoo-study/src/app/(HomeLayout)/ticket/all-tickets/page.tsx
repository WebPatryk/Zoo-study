'use client';

import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '../Ticket.module.scss';

const Index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await fetch('http://localhost:3001/ticket');
      const data = await res.json();
      console.log(data);
      setData(data);
    };
    fetchTickets();
  }, []);

  return (
    <div style={{ marginLeft: '2rem' }}>
      <h3 className={styles.title}>All tickets </h3>

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Discounts</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  {item &&
                    item.tickets &&
                    item.tickets.map((ticket, index) => (
                      <p key={index}>
                        <span>{ticket.count}: </span>
                        <span>{ticket.discount}</span>
                      </p>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
