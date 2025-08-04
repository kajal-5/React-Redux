
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../../store/auth";
import "./loginPage.css";


const LoginPage = () => {
  const dispatch = useDispatch();
//   const navigate = useNavigate();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const { loading, error } = useSelector((state) => state.auth);

  const switchMode = () => {
    setIsLogin((prev) => !prev);
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
    //   navigate("/profilepage");
    }
  };

  return (
    <form onSubmit={submitHandler} className="login-form">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password:</label>
      <input type="password" ref={passwordRef} required />

      {!isLogin && (
        <>
          <label>Confirm Password:</label>
          <input type="password" ref={confirmPasswordRef} required />
        </>
      )}

      <button type="submit" disabled={loading}>
        {isLogin ? "Login" : "Create Account"}
      </button>

      <button type="button" onClick={switchMode}>
        {isLogin ? "Create new account" : "Login"}
      </button>

      {email && <p><a href="/forgot-password">Forgot Password?</a></p>}

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default LoginPage;
