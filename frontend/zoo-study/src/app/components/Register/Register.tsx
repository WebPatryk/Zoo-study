'use client';
import type { NextPage } from 'next';
import personWithDog from '@/app/assets/images/person-with-dog.svg';
import Image from 'next/image';
import styles from './Register.module.scss';
import icon from '@/app/assets/icons/paw.svg';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Register: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    await handleCreateUser(data);
    await handleCreateAppUser(data);
  };

  const handleCreateAppUser = async data => {
    const values = {
      username: data.name,
      email: data.email,
      password: data.password,
      country: 'Poland',
      phone: '123456789',
      zone: 'A',
      role: 'employee',
      avatar: '#',
      daysOff: {
        paidLeave: 12,
        availablePaidLeave: 12,
        vaccationLeave: 12,
        availableVaccationLeave: 12,
        compoffLeave: 12,
        availableCompoffLeave: 12,
        upload: 12,
        availableUpload: 12
      },
      calendarEvents: []
    };
    try {
      const response = await fetch('http://localhost:3001/app-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const responseData = await response.json();
      toast.success('Data are correct', {
        position: 'bottom-right',
        autoClose: 5000
      });
    } catch (error) {
      toast.error('Error!');
      console.error('Login failed', error);
    }
  };

  const handleCreateUser = async data => {
    try {
      const response = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      toast.success('Data are correct', {
        position: 'bottom-right',
        autoClose: 5000
      });
      setTimeout(async () => {
        await router.push('/login');
      }, 1000);
    } catch (error) {
      toast.error('Error!');
      console.error('Login failed', error);
    }
  };

  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.image}>
          <Image src={personWithDog} height={600} width={600} alt="icon" />
        </div>
      </div>
      <div className={styles.rightPanel}>
        <Image
          src={icon}
          height={100}
          width={100}
          alt="Person with dog image"
        />
        <h1 className={styles.title}>Register</h1>
        <p className={styles.subtitle}>To animals word's</p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            {...register('name', {
              required: 'Username is required',
              minLength: {
                value: 6,
                message: 'Username is too short'
              },
              maxLength: {
                value: 40,
                message: 'Username is too long'
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
            placeholder="E-mail"
            className={styles.input}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Email is not valid'
              },
              minLength: {
                value: 6,
                message: 'Username is too short'
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
          <div className={styles.passwordWrapper}>
            <input
              type={passwordShown ? 'text' : 'password'}
              placeholder="Password"
              className={styles.input}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password is too short'
                },
                maxLength: {
                  value: 40,
                  message: 'Password is too long'
                }
              })}
            />
            {passwordShown ? (
              <FaRegEye
                className={styles.passwordIcon}
                onClick={togglePassword}
              />
            ) : (
              <FaRegEyeSlash
                className={styles.passwordIcon}
                onClick={togglePassword}
              />
            )}
          </div>
          <ErrorMessage
            errors={errors}
            name="password"
            as="p"
            className={styles.error}
          />

          <button type="submit" className={styles.button}>
            Submit
          </button>
          <p className={styles.noAccount}>
            Already have an account?
            <Link href="/login">
              <span className={styles.signUpText}>Log in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
