import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginForm.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const LoginForm = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [animateOut, setAnimateOut] = useState(false);

  const navigate = useNavigate();

  // Pre-fill email from URL parameter if coming from registration
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get('email');
    if (emailFromUrl) {
      setIdentifier(emailFromUrl);
    }
  }, []);

  const loginAnimation = {
    initial: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100, transition: { duration: 0.2 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    const isEmail = identifier.includes("@");
    const payload = {
      password,
      ...(isEmail ? { email: identifier } : { username: identifier }),
    };

    try {
      const response = await axios.post(
        "https://localhost:58296/api/User/Login",
        payload
      );
      console.log('Login response payload:', response.data);
      // Support both object ({ token }) and raw string responses
      const returnedToken = typeof response.data === 'string'
        ? response.data
        : response.data.token;
      if (returnedToken) {
        try {
          localStorage.setItem('jwtToken', returnedToken);
        } catch (storageErr) {
          console.error('Failed to write token into localStorage', storageErr);
          setError('Unable to save authentication token');
          return;
        }
      } else {
        console.error('No token field in login response');
        setError('No authentication token received');
        return;
      }
      navigate('/HomePage');
      return;
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        // Try standard message fields
        let backendMsg = data.message || data.errorMessage;
        // Flatten validation errors if present
        if (!backendMsg && data.errors) {
          const errs = data.errors;
          backendMsg = Object.values(errs)
            .flat()
            .join(', ');
        }
        setError(backendMsg || "Invalid credentials.");
      } else if (err.request) {
        setError("Network error. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <motion.div className="login-container">
      <motion.div
        className="login-form"
        initial="initial"
        animate={animateOut ? "exit" : "initial"}
        variants={loginAnimation}
      >
        <h1 className="form-title">Sign In</h1>
        {error && (
          <label className="custom-error-label text-danger" htmlFor="error">
            {error}
          </label>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <input
              type="text"
              id="identifier"
              className="form-control"
              placeholder="Username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              maxLength={150}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              maxLength={200}
            />
          </div>
          <motion.button
            className="btn-primary login-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
          >
            Sign In
          </motion.button>
        </form>
        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => {
              setAnimateOut(true);
              setTimeout(() => {
                navigate("/Register");
              }, 200);
            }}
          >
            Create Account
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
