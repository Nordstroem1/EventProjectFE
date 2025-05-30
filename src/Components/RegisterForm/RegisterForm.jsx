import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import countryList from "react-select-country-list";
import { AnimatePresence, motion } from "framer-motion";
import "./RegisterForm.css";
import "../../index.css";
import { PiPersonSimpleHikeThin } from "react-icons/pi";
import CityAutocomplete from "./CityAutoComplete";

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
    username: "",
    password: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [error, setError] = useState("");
  const options = countryList().getData();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.city
    ) {
      setError("Please fill in all required fields.");
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
                    color: "white",
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
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username..."
                maxLength={50}
                autoComplete="username"
              />
            </motion.div>
            <motion.div
              variants={childVariants}
              className="form-group form-group-column"
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={150}
                placeholder="Email..."
                autoComplete="email"
              />
            </motion.div>
            <motion.div
              variants={childVariants}
              className="form-group form-group-column"
            >
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
            <motion.div variants={childVariants}>
              <div className="form-group form-group-column">
              </div>
              <CityAutocomplete
                className="input-city"
                value={formData.city}
                onChange={(val) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    city: val,
                  }))
                }
              />
            </motion.div>
            <motion.div
              variants={childVariants}
              className="btn-container"
            >
             <motion.button
                className="Register-btn Back-Btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={handleBack}
              >
                Back
              </motion.button>
              <motion.button
                className="btn-primary login-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => console.log("Login")}
                type="submit"
              >
                Register
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterForm;
