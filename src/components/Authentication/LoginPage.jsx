import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../../store/auth";

import { Link, useNavigate } from "react-router-dom";
import { fetchCartFromAPI } from "../../store/cart";
import "./loginPage.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const clearFields = () => {
    setEmail("");
    if (passwordRef.current) passwordRef.current.value = "";
    if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
  };

  const switchMode = () => {
    setIsLogin((prev) => !prev);
    clearFields();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;

    if (!isLogin) {
      const confirmPassword = confirmPasswordRef.current.value;
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }

    const action = isLogin
      ? loginUser({ email, password })
      : signupUser({ email, password });

    const resultAction = await dispatch(action);

    if (resultAction.meta.requestStatus === "fulfilled") {
      alert("Authentication successful!");
      clearFields();
      await dispatch(fetchCartFromAPI());
      navigate("/item-form");
    }
  };

  return (
    <form onSubmit={submitHandler} className="login-form">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

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

      {!isLogin && (
        <>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            ref={confirmPasswordRef}
            required
          />
        </>
      )}

      <button type="submit" disabled={loading}>
        {isLogin ? "Login" : "Create Account"}
      </button>

      <button type="button" onClick={switchMode}>
        {isLogin ? "Create new account" : "Login"}
      </button>

      {isLogin && (
        <p>
          <Link
            to="/forgot-password"
            onClick={() => {
              clearFields();
            }}
          >
            Forgot Password?
          </Link>
        </p>
      )}

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default LoginPage;
