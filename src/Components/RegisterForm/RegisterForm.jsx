import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import countryList from "react-select-country-list";
import ReactCountryFlag from "react-country-flag";
import { AnimatePresence, motion } from "framer-motion";
import "./RegisterForm.css";
import "../../index.css";
import { PiPersonSimpleHikeThin } from "react-icons/pi";

const containerVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: { duration: 0.5 },
  },
};

const childVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const RegisterForm = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    username: "",
    password: "",
    passwordConfirm: "",
    firstName: "",
    lastName: "",
    city: "",
    country: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const options = countryList().getData();

  const handleCountryChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      country: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.passwordConfirm ||
      !formData.city ||
      !formData.country
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    console.log("Form Data:", formData);
  };

  const handleBack = () => {
    setIsExiting(true);
    setTimeout(() => window.history.back(), 200);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="Register-div"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.form onSubmit={handleSubmit} noValidate>
            <motion.div
              className="Register-Extra-Div"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 style={{ marginTop: "15px" }}>Create Your Account</h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <PiPersonSimpleHikeThin
                  style={{
                    fontSize: "80px",
                    color: "black",
                    marginLeft: "10px",
                  }}
                />
                <div className="Register-Extra-Div-Text">
                  <p>Join us and create fun events with your friends!</p>
                </div>
              </div>
            </motion.div>
            <div className="form-group form-group-column">
              {error && (
                <div className="custom-error-label text-danger">{error}</div>
              )}
            </div>
            <motion.div
              variants={childVariants}
              className="form-group form-group-column"
              style={{ marginTop: "1rem" }}
            >
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="John Doe"
                maxLength={50}
                autoComplete="username"
              />
            </motion.div>
            <motion.div
              variants={childVariants}
              className="form-group form-group-column"
            >
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={150}
                placeholder="your.email@example.com"
                autoComplete="email"
              />
            </motion.div>
            <motion.div
              variants={childVariants}
              className="form-group form-group-column"
            >
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </motion.div>
            <motion.div
              variants={childVariants}
              className="form-group form-group-column"
            >
              <label>Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </motion.div>
            <motion.div
              variants={childVariants}
              className="form-group form-group-column"
            >
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                maxLength={50}
                placeholder="Your City..."
                list="cityOptions"
              />
              <datalist id="cityOptions">
                {cities.slice(0, 100).map((city) => (
                  <option key={city.id} value={city.name} />
                ))}
              </datalist>
            </motion.div>
            <motion.div
              variants={childVariants}
              className="form-group form-group-column"
            >
              <label>Country</label>
              <Select
                className="my-custom-select"
                options={options}
                onChange={handleCountryChange}
                placeholder="Select a country"
                isSearchable
                formatOptionLabel={(option) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ReactCountryFlag
                      countryCode={option.value}
                      svg
                      style={{ width: "1.5em", height: "1.5em" }}
                    />
                    <span style={{ marginLeft: "0.5em" }}>{option.label}</span>
                  </div>
                )}
              />
            </motion.div>
            <motion.div
              variants={childVariants}
              className="form-group"
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "flex-start",
                gap: "1rem",
              }}
            >
              <button
                className="Register-btn Back-Btn"
                type="button"
                onClick={handleBack}
                style={{ width: "30%" }}
              >
                Back
              </button>
              <button
                className="btn-primary Register-btn inline"
                type="submit"
                style={{ width: "70%" }}
              >
                Register
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterForm;
