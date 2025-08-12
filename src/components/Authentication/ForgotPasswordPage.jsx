import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordReset } from "../../store/auth";
// import "./forgotPassword.css";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  console.log("forgort password page", email);

  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(sendPasswordReset(email));

    if (resultAction.meta.requestStatus === "fulfilled") {
      alert("Password reset email sent!");
      setEmail("");
    }
  };
1


  return (
    <form onSubmit={submitHandler} className="forgot-form">
      <h1>Forgot Password</h1>

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        Send Reset Link
      </button>

      {successMessage && <p className="success">{successMessage}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default ForgotPasswordPage;
