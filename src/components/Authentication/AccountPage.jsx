import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../store/auth";
import "./accountPage.css";

const AccountPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { loading, error } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const resultAction = await dispatch(signupUser({ email, password }));
    if (resultAction.meta.requestStatus === "fulfilled") {
      alert("Account created successfully!");
      setEmail("");
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    }
  };

  return (
    <form onSubmit={submitHandler} className="account-form">
      <h1>Create Account</h1>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" ref={passwordRef} required />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input id="confirmPassword" name="confirmPassword" type="password" ref={confirmPasswordRef} required />
      <button type="submit" disabled={loading}>Create Account</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default AccountPage;