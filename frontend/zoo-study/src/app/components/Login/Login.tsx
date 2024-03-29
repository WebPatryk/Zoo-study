'use client';

import type { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import dog from '@/app/assets/images/dog.svg';
import icon from '@/app/assets/images/dog.svg';
import Image from 'next/image';
import styles from './Login.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { ErrorMessage } from '@hookform/error-message';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';

type Inputs = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    const { email, password } = data;

    const loginUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        const responseData = await response.json();
        console.log(responseData);
        if (responseData.token) {
          toast.success('Data are correct', {
            position: 'bottom-right',
            autoClose: 5000
          });
          setTimeout(async () => {
            await localStorage.setItem(
              'access_token',
              responseData.access_token
            );
            await localStorage.setItem('email', email);
            await router.push('/');
          }, 1000);
        } else {
          toast.error('Passed credentials are not correct :(', {
            position: 'bottom-right'
          });
        }
      } catch (error) {
        toast.error('Error!');
        console.error('Login failed', error);
      }
    };
    loginUser();
  };

  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.image}>
          <Image src={dog} height={600} width={600} alt="icon" />
        </div>
      </div>
      <div className={styles.rightPanel}>
        <Image src={icon} height={100} width={100} alt="Dog image" />
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>To animals word's</p>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <input
            type="text"
            placeholder="Email"
            className={styles.input}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Email is not valid'
              },
              minLength: {
                value: 6,
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
            Don't have an account
            <Link href="/register">
              <span className={styles.signUpText}>Sign up</span>
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
