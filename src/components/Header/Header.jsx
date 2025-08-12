import { Link, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth";

import LoginPage from "../Authentication/LoginPage";
import ForgotPasswordPage from "../Authentication/ForgotPasswordPage";
import ItemForm from "../Shop/ItemForm";
import CartList from "../Cart/CartList";
import ProtectedRoute from "./ProtectedRoute";
import CartButton from "../Cart/CartButton";

const Header = () => {
  const { token, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <header>
        <nav>
          {!token && (
            <>
              <Link to="/">Login</Link>
              {/* <Link to="/forgot-password">Forgot Password</Link> */}
            </>
          )}
          {token && (
            <>
              <Link to="/items">Items</Link>
              <CartButton />
              <span>Welcome, {email}</span>
              <button onClick={logoutHandler}>Logout</button>
            </>
          )}
        </nav>
      </header>

      {/* Always render cart list so toggle works */}
      {token && <CartList />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/items" element={ <ProtectedRoute> <ItemForm /></ProtectedRoute>}/>
      </Routes>
    </>
  );
};

export default Header;