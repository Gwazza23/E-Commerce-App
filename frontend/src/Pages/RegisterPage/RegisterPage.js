import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

import "./RegisterPage.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/users/register",
        {
          username,
          password,
          firstName,
          lastName,
          email,
        }
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error(error.response.data);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <motion.div
      className="register-form"
      initial={{ y: "25%", opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 50 },
      }}
      exit={{ y: "25%", opacity: 0, transition: { duration: 0.5 } }}
    >
      <Link className="link" to={"/"}>
        <h2 className="logo">
          Style<span>Crate</span>
        </h2>
      </Link>
      <form onSubmit={handleSubmit}>
        {errorMessage && <div className="error">{errorMessage}</div>}
        <div className="register-form-div">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="register-form-div">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="register-form-div">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="register-form-div">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className="register-form-div">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <br />
        <button type="submit"> Create Account </button>
      </form>
      <p>
        Have an account?{" "}
        <Link className="link" to={"/login"}>
          Log In
        </Link>{" "}
      </p>
    </motion.div>
  );
}
