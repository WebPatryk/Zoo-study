'use client';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FieldPath, SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import { MdOutlineSecurityUpdate } from 'react-icons/md';
import styles from './BasicProfile.module.scss';

type Inputs = {
  username: string;
  email: string;
  password: string;
  country: string;
  phone: string;
  zone: string;
  role: string;
  image: string;
};

const BasicProfile = ({ profileData }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue
  } = useForm<Inputs>();

  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [file, setFile] = useState<string | Blob>('');
  // console.log(watch('name')); // watch input value by passing the name of it

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleImageChange = e => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (profileData) {
      //@ts-ignore
      setValue('username', profileData.username);
      setValue('email', profileData.email);
      setValue('password', profileData.password);
      setValue('country', profileData.country);
      setValue('phone', profileData.phone);
      setValue('zone', profileData.zone);
      setValue('role', profileData.role);
      setValue('image', profileData.image);
    }
  }, [profileData]);

  const onSubmit = async (data: any) => {
    // const formData = new FormData();
    // formData.append('file', file);

    //upload image
    // await uploadAvatar();

    //upload rest data

    console.log(data);
    await uploadUserInfo(data);
  };

  const uploadAvatar = async () => {
    try {
      const res = await fetch('http://localhost:3001/uploadddddddddddd', {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const data = await res.json();
      console.log(data);
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const uploadUserInfo = async data => {
    if (!data) {
      console.error('Error: Some necessary data are missing in data');
      return;
    }
    // const userData = { ...data, role: data.role[0] };
    // console.log(userData);

    try {
      const res = await fetch(
        'http://localhost:3001/app-users/655561bf5fe23bfc08460153',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      );
      const values = await res.json();
      console.log(values);
      console.log('User data uploaded successfully');
    } catch (error) {
      console.error('Error uploading user data:', error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <img src="#" alt="" />
            <div className={styles.file}>
              <input
                name="image"
                type="file"
                id="updateAvatar"
                onChange={handleImageChange}
              />
              <label htmlFor="updateAvatar" className={styles.updateLogo}>
                <MdOutlineSecurityUpdate />
                <span>Update Avatar</span>
              </label>
              <ErrorMessage
                errors={errors}
                name="image"
                as="p"
                className={styles.error}
              />
            </div>
            <div className={styles.basicProfileForm}>
              <div className={styles.left}>
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    className={styles.input}
                    {...register('username' as FieldPath<undefined>, {
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
                    {...register('password' as FieldPath<undefined>, {
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
                    {...register('phone' as FieldPath<undefined>, {
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

                <div className={styles.role}>
                  <input
                    name="role"
                    type="checkbox"
                    id="employee"
                    value="employee"
                    {...register('role' as FieldPath<undefined>, {
                      required: 'Role is required'
                    })}
                  />
                  <label htmlFor="employee">Employee</label>
                  <input
                    name="role"
                    type="checkbox"
                    id="guardian"
                    value="guardian"
                    {...register('role' as FieldPath<undefined>, {
                      required: 'Role is required'
                    })}
                  />
                  <label htmlFor="guardian">Guardian</label>
                  <input
                    name="role"
                    type="checkbox"
                    id="vet"
                    value="vet"
                    {...register('role' as FieldPath<undefined>, {
                      required: 'Role is required'
                    })}
                  />
                  <label htmlFor="vet">Vet</label>
                  <ErrorMessage
                    errors={errors}
                    name="role"
                    as="p"
                    className={styles.error}
                  />
                </div>
              </div>
              <div className={styles.right}>
                <div>
                  <input
                    type="text"
                    placeholder="Email"
                    className={styles.input}
                    {...register('email' as FieldPath<undefined>, {
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
                    {...register('country' as FieldPath<undefined>, {
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

                <div>
                  <Controller
                    name="zone"
                    control={control}
                    rules={{ required: 'Zone is required' }}
                    render={({ field }: { field: any }) => (
                      <div style={{ margin: '3.5rem 0 .3rem 0' }}>
                        <select {...field} className={styles.select}>
                          <option value="">Select zone</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                        </select>
                      </div>
                    )}
                  />

                  <ErrorMessage
                    errors={errors}
                    name="zone"
                    as="p"
                    className={styles.error}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className={styles.button}>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasicProfile;
