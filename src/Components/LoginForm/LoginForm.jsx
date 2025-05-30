import React, { useState } from "react";
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
      console.log(response.data);

      if (response.data && response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
        setAnimateOut(true);
        setTimeout(() => {
          navigate("/HomePage");
        }, 700);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid credentials.");
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
        <h1>Sign in</h1>
        {error && (
          <label className="custom-error-label text-danger" htmlFor="error">
            {error}
          </label>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="identifier" className="form-label">
              Username or Email
            </label>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
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
            Login
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
