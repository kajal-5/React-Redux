import { Link, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth";

import LoginPage from "../Authentication/LoginPage";
import ForgotPasswordPage from "../Authentication/ForgotPasswordPage";
import ItemForm from "../Shop/ItemForm";
import CartList from "../Cart/CartList";
import ProtectedRoute from "./ProtectedRoute";
import CartButton from "../Cart/CartButton";
import "./header.css";

const Header = () => {
  const { token, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="header-ribbon">
        <div className="header-content">
          <div className="nav-left">
            <span className="header-title">Redux Auth</span>
            {!token && <Link to="/">Login</Link>}
            {token && <span>Welcome, {email}</span>}
          </div>

          <div className="nav-right">
            {token && (
              <>
                <CartButton />
                {token && <Link to="/items">Items</Link>}
                <button onClick={logoutHandler}>Logout</button>
              </>
            )}
          </div>
        </div>
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