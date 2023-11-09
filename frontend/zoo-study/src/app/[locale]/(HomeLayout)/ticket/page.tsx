'use client';

import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import { MdOutlineSecurityUpdate } from 'react-icons/md';
import styles from './Ticket.module.scss';

type Inputs = {
  firstName: string;
  email: string;
  lastName: string;
  phone: string;
};

const Index = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  // console.log(watch('name')); // watch input value by passing the name of it

  const [formFields, setFormFields] = useState([{ name: '', age: '' }]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const addFields = () => {
    let object = {
      name: '',
      age: ''
    };

    setFormFields([...formFields, object]);
  };

  const removeFields = index => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

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
      <h4>Ticket generator</h4>
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
                    placeholder="firstName"
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
                      required: 'email is required',
                      minLength: {
                        value: 3,
                        message: 'email is too short'
                      },
                      maxLength: {
                        value: 40,
                        message: 'email is too long'
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

                <div className="">
                  {formFields.map((form, index) => {
                    return (
                      <div key={index}>
                        <input
                          name="name"
                          placeholder="Name"
                          onChange={event => handleFormChange(event, index)}
                          value={form.name}
                        />
                        <input
                          name="age"
                          placeholder="Age"
                          onChange={event => handleFormChange(event, index)}
                          value={form.age}
                        />
                        <button onClick={() => removeFields(index)}>
                          Remove
                        </button>
                      </div>
                    );
                  })}
                  <button onClick={addFields}>Add More..</button>
                </div>
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

                <select name="" id="" onChange={changeLanguage} value={zone}>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
            </div>

            <h6>
              Price: <span>50$</span>
            </h6>

            <button type="submit" className={styles.button}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
