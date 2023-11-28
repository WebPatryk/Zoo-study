'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { ErrorMessage } from '@hookform/error-message';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineSecurityUpdate } from 'react-icons/md';
import styles from './Ticket.module.scss';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { FaPlugCircleBolt } from 'react-icons/fa6';
import Modal, { useModal } from '@/app/hooks/modal/useModal';
import QRCode from 'react-qr-code';
import { json } from 'stream/consumers';
import { toast } from 'react-toastify';

type Inputs = {
  firstName: string;
  email: string;
  lastName: string;
  phone: string;
};

const Index = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    register
  } = useForm();
  const pathname = usePathname();
  const router = useRouter();
  const { isOpen, close, data, open } = useModal();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);

  // console.log(watch('name')); // watch input value by passing the name of it

  type Inputs = {
    firstName: string;
    email: string;
    lastName: string;
    phone: string;
    rows: { textInput: string; selectInput: string }[];
  };

  const pricePlan = {
    student: 10,
    normal: 20,
    retiree: 5
    // Add more roles if needed
  };

  const [formFields, setFormFields] = useState<Inputs['rows']>([
    { textInput: '', selectInput: '' }
  ]);
  const [mainData, setMainData] = useState({});

  const addRow = () => {
    setFormFields([...formFields, { textInput: '', selectInput: '' }]);
  };

  const removeRow = (index: number) => {
    const newFormFields = [...formFields];
    newFormFields.splice(index, 1);
    setFormFields(newFormFields);
  };

  let modalRef = useRef();
  function calculateTotalCost(tickets, pricePlan) {
    const totalCost = {};

    tickets.forEach(ticket => {
      const { textInput, selectInput } = ticket;
      const price = pricePlan[selectInput];
      const cost = textInput * price;

      if (totalCost[selectInput]) {
        totalCost[selectInput] += cost;
      } else {
        totalCost[selectInput] = cost;
      }
    });

    return totalCost;
  }

  const generateTicket = async ticketData => {
    console.log(ticketData);
    try {
      const response = await fetch('http://localhost:3001/ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData)
      });
      const data = response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async data => {
    console.log(formFields);
    console.log(data);
    setMainData(data);
    const result = calculateTotalCost(formFields, pricePlan);
    const totalPrice = Object.values(result).reduce((acc, val) => acc + val, 0);

    const tickets = formFields.map(field => ({
      count: Number(field.textInput),
      discount: field.selectInput
    }));
    const ticketData = {
      firstName: data.firstName,
      email: data.email,
      lastName: data.lastName,
      phone: data.phone,
      tickets
    };

    if (!isNaN(totalPrice as number)) {
      console.log('Total Price:', totalPrice);
      await generateTicket(ticketData);
      setPrice(totalPrice as number);
      open();
      toast.success('Ticket generated successfully', {
        position: 'bottom-right',
        autoClose: 5000
      });
    }
  };

  const handleAllTickets = () => {
    console.log(pathname);
    router.push(`${pathname}/all-tickets`);
  };

  return (
    <div style={{ margin: '0 2rem' }}>
      <h4 className={styles.title}>Ticket generator</h4>
      <button
        className={styles.button}
        onClick={handleAllTickets}
        style={{ marginLeft: 'auto', display: 'flex' }}
      >
        All tickets
      </button>
      <div className={styles.container}>
        <div>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div className={styles.basicProfileForm}>
              <div className={styles.left}>
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className={styles.input}
                    {...register('firstName', {
                      required: 'First Name is required',
                      minLength: {
                        value: 3,
                        message: 'First Name is too short'
                      },
                      maxLength: {
                        value: 40,
                        message: 'First Name is too long'
                      }
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="firstName"
                    as="p"
                    className={styles.error}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Email"
                    className={styles.input}
                    {...register('email', {
                      required: 'Email is required',
                      minLength: {
                        value: 3,
                        message: 'Email is too short'
                      },

                      maxLength: {
                        value: 40,
                        message: 'Email is too long'
                      }
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    as="p"
                    className={styles.error}
                  />
                </div>

                <label className={styles.ticketLabel}>
                  Select your ticket discounts:
                </label>
              </div>
              <div className={styles.right}>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={styles.input}
                    {...register('lastName', {
                      required: 'Last Name is required',
                      minLength: {
                        value: 3,
                        message: 'Last Name is too short'
                      },
                      maxLength: {
                        value: 40,
                        message: 'Last Name is too long'
                      }
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="lastName"
                    as="p"
                    className={styles.error}
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Phone"
                    className={styles.input}
                    {...register('phone', {
                      required: 'Phone is required',
                      minLength: {
                        value: 3,
                        message: 'Phone is too short'
                      },
                      maxLength: {
                        value: 40,
                        message: 'Phone is too long'
                      }
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="phone"
                    as="p"
                    className={styles.error}
                  />
                </div>
              </div>
            </div>

            <div>
              {formFields.map((field, index) => (
                <div key={index} className={styles.ticketRow}>
                  <input
                    type="number"
                    placeholder="Count"
                    value={field.textInput}
                    onChange={e => {
                      const newFormFields = [...formFields];
                      newFormFields[index].textInput = e.target.value;
                      setFormFields(newFormFields);
                    }}
                    className={styles.input}
                  />
                  <select
                    value={field.selectInput}
                    onChange={e => {
                      const newFormFields = [...formFields];
                      newFormFields[index].selectInput = e.target.value;
                      setFormFields(newFormFields);
                    }}
                    className={styles.select}
                  >
                    <option value="student">Student</option>
                    <option value="normal">Normal</option>
                    <option value="retiree">Retiree</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    className={styles.removeTicketButton}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addRow}
                className={styles.addTicketButton}
              >
                <FaPlus /> Add Ticket
              </button>
            </div>
            <div>
              <button type="submit" className={styles.button}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      {isOpen() && (
        <div id="printModal" ref={modalRef}>
          <Modal
            title="Your ticket"
            buttons={{
              confirm: {
                label: 'Print',
                onClick() {
                  window.print();
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
            <div className={styles.ticketPrint}>
              <div>
                <span className={styles.ticketField}>First name: </span>
                <span>{mainData.firstName}</span>
              </div>
              <div>
                <span className={styles.ticketField}>Last name: </span>
                <span> {mainData.lastName}</span>
              </div>
              <div>
                <span className={styles.ticketField}>Email: </span>
                <span> {mainData.email}</span>
              </div>
              <div>
                <span className={styles.ticketField}>Phone: </span>
                <span> {mainData.phone}</span>
              </div>
            </div>

            <div>
              <h4 style={{ marginTop: '3rem' }}>Ordered:</h4>
              {formFields.map((field, index) => (
                <div key={index}>
                  <p>
                    Count: {field.textInput} | Discount: {field.selectInput}
                  </p>
                </div>
              ))}
              <h2 style={{ marginTop: 30 }}>
                Price: <span>{price}$</span>
              </h2>
            </div>
            <div
              style={{
                height: 'auto',
                margin: '2rem auto',
                maxWidth: '100%',
                width: '100%'
              }}
            >
              <QRCode
                size={256}
                style={{ height: '40%', maxWidth: '100%', width: '100%' }}
                value="hey"
                viewBox={`0 0 256 256`}
              />
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Index;
