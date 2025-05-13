import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import ReactCountryFlag from 'react-country-flag';
import { motion } from 'framer-motion';
import './RegisterForm.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 }
};

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        username: '',
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastName: '',
        city: '',
        country: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const options = countryList().getData();

    const handleCountryChange = (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            country: selectedOption ? selectedOption.value : ''
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Check that no field is empty
        if (
            !formData.email ||
            !formData.username ||
            !formData.password ||
            !formData.passwordConfirm ||
            !formData.city ||
            !formData.country
        ) {
            setError('Please fill in all required fields.');
            return;
        }

        // Check if passwords match
        if (formData.password !== formData.passwordConfirm) {
            setError('Passwords do not match.');
            return;
        }

        console.log('Form Data:', formData);
    };

    return (
       <motion.div 
         className='Register-div' 
         initial={{ opacity: 0, y: -100 }} 
         animate={{ opacity: 1, y: 0 }}
       >
         <motion.form 
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
         >
            <motion.h2 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
                Register
            </motion.h2>
            <motion.div variants={childVariants}>
                <label>Email </label>
                {error && (
                    <div
                        className="custom-error-label text-danger"
                        style={{ marginBottom: '1rem' }}
                    >
                        {error}
                    </div>
                )}
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={150}
                    placeholder='JohnDoe@hotmail.com...'
                />
            </motion.div>
              <motion.div variants={childVariants}>
                  <label>Username </label>
                  <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      placeholder='Username...'
                  />
              </motion.div>
              <motion.div variants={childVariants}>
                  <label>Password </label>
                  <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder='Password...'
                  />
              </motion.div>
              <motion.div variants={childVariants}>
                  <label>Confirm Password </label>
                  <input
                      type="password"
                      name="passwordConfirm"
                      value={formData.passwordConfirm}
                      onChange={handleChange}
                      required
                      placeholder='Confirm password...'
                  />
              </motion.div>
              <motion.div variants={childVariants}>
                <label>City </label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    maxLength={50}
                    placeholder='Stockholm...'
                />
              </motion.div>
              <motion.div variants={childVariants}>
                  <label>Country </label>
                  <Select
                      options={options}
                      onChange={handleCountryChange}
                      placeholder="Select a country"
                      isSearchable
                      formatOptionLabel={(option) => (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                              <ReactCountryFlag
                                  countryCode={option.value}
                                  svg
                                  style={{ width: '1.5em', height: '1.5em' }}
                              />
                              <span style={{ marginLeft: '0.5em' }}>{option.label}</span>
                          </div>
                      )}
                  />
              </motion.div>
              <motion.div variants={childVariants}>
                  <button className='btn-primary' type="submit">
                    Register
                  </button>
              </motion.div>
         </motion.form>
       </motion.div>
    );
};

export default RegisterForm;