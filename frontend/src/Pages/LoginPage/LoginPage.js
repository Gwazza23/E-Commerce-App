import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/users/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.error(error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <motion.div
      className="login-form"
      initial={{ y: "25%", opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 50 },
      }}
      exit={{ y: "25%", opacity: 0, transition: { duration: 0.5 } }}
    >
      <h2 className="logo">
        <Link className="link" to={"/"}>
          Style<span>Crate</span>
        </Link>
      </h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <div className="login-form-div">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="login-form-div">
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link className="link" to={"/register"}>
          Register
        </Link>
      </p>
    </motion.div>
  );
}
