import React, { useState } from "react";
import styles from "./Register.module.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: handle registration
    alert("Registration submitted! (No real backend yet)");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <PersonAddIcon fontSize="inherit" />
        </div>
        <h2>Create Account</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className={styles.input}
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoComplete="username"
            placeholder="Choose a unique username"
          />
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            className={styles.input}
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoComplete="name"
            placeholder="Enter your full name"
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="e.g. you@email.com"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            placeholder="Create a strong password"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            className={styles.input}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            placeholder="Re-enter your password"
          />
          <button type="submit" className={styles.button}>Register</button>
        </form>
        <div className={styles.loginLink}>
          Already have an account? <a href="/login">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default Register; 