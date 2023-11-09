'use client';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import { MdOutlineSecurityUpdate } from 'react-icons/md';
import styles from './BasicProfile.module.scss';

type Inputs = {
  username: string;
  password: string;
  phone: string;
};

const BasicProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  // console.log(watch('name')); // watch input value by passing the name of it

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [zone, setZone] = useState('A');
  const changeLanguage = (e: any) => {
    setZone(e.target.value);
  };

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {};

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.rightPanel}>
          <img src="#" alt="" />
          <div>
            <input type="file" id="updateAvatar" />
            <label htmlFor="updateAvatar">
              <MdOutlineSecurityUpdate />
              <span>Update Avatar</span>
            </label>
          </div>
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
                    placeholder="Username"
                    className={styles.input}
                    {...register('username', {
                      required: 'Username is required',
                      minLength: {
                        value: 3,
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
                    name="username"
                    as="p"
                    className={styles.error}
                  />
                </div>

                <div className={styles.passwordWrapper}>
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    placeholder="Password"
                    className={styles.input}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 3,
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

                <div>
                  <input type="checkbox" id="employee" value="employee" />
                  <label htmlFor="employee">Employee</label>
                  <input type="checkbox" id="guardian" value="guardian" />
                  <label htmlFor="guardian">Guardian</label>
                  <input type="checkbox" id="vet" value="vet" />
                  <label htmlFor="vet">Vet</label>
                </div>
              </div>
              <div className={styles.right}>
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

                <div>
                  <input
                    type="text"
                    placeholder="Country"
                    className={styles.input}
                    {...register('country', {
                      required: 'Country is required',
                      minLength: {
                        value: 3,
                        message: 'Country is too short'
                      },
                      maxLength: {
                        value: 40,
                        message: 'Country is too long'
                      }
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="country"
                    as="p"
                    className={styles.error}
                  />
                </div>

                <select name="" id="" onChange={changeLanguage} value={zone}>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
            </div>

            <button type="submit" className={styles.button}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasicProfile;
