import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import countryList from "react-select-country-list";
import { AnimatePresence, motion } from "framer-motion";
import "./RegisterForm.css";
import "../../index.css";
import { PiPersonSimpleHikeThin } from "react-icons/pi";
import { FaImage } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Enhanced validation
    if (
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.city
    ) {
      setError("Please fill in all required fields.");
      return;
    } // Validate profile picture
    if (!profilePic) {
      setError("Please select a profile picture.");
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("UserName", formData.username);
      formDataToSend.append("Email", formData.email);
      formDataToSend.append("Password", formData.password);
      formDataToSend.append("LivingLocation", formData.city);

      formDataToSend.append("profilePicture", profilePic);

      const response = await axios.post(
        "https://localhost:58296/api/User/CreateUser",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Registration successful:", response.data);

      navigate(`/LoginForm?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      console.error(err);
      console.log("Full error response:", err.response?.data);

      const backendError =
        err.response?.data?.message ||
        err.response?.data?.errorMessage ||
        err.response?.data?.errors?.Password?.join(", ") ||
        (typeof err.response?.data === "string" ? err.response.data : null) ||
        "An error occurred. Please try again.";

      setError(backendError);
    }
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
                className="input-field"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                maxLength={50}
                placeholder="Username..."
              />
            </motion.div>
            <motion.div
              variants={childVariants}
              className="form-group form-group-column"
            >
              <input
                className="input-field"
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
                className="input-field"
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
              <input
                className="input-field"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your livning location..."
                required
              />
            </motion.div>
            <motion.div
              variants={childVariants}
              className="form-group form-group-column"
            >
              <div className="profile-pic-wrapper">
                <input
                  type="file"
                  id="profile-pic"
                  name="profilePic"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) {
                      setError("No file selected.");
                    } else if (!file.type.startsWith("image/")) {
                      setError("Please select a valid image file.");
                    } else {
                      setError("");
                      setProfilePic(file);
                      console.log("Selected file details:", file);
                    }
                  }}
                  className="profile-pic-input"
                />
                <motion.button
                  className="img-upload-button"
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById("profile-pic").click()}
                >
                  <span className="img-upload-content">
                    <FaImage className="image-icon" />
                    Profile Picture
                  </span>
                </motion.button>
              </div>
            </motion.div>
            <motion.div variants={childVariants} className="btn-container">
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
