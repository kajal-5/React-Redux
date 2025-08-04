// pages/ForgotPasswordPage.jsx
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordReset } from "../../store/login";

const ForgotPasswordPage = () => {
  const emailRef = useRef();
  const dispatch = useDispatch();
  const { successMessage, error, loading } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    await dispatch(sendPasswordReset(email));
  };

  return (
    <div className="forgot-container">
      <h2>Reset Password</h2>
      <form onSubmit={submitHandler}>
        <label>Enter your registered email:</label>
        <input type="email" ref={emailRef} required />
        <button disabled={loading}>Send Reset Link</button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
