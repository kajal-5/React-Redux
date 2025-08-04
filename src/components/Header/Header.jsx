

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import './header.css';

import { toggleCart } from "../../store/cart";
import CartButton from "../Cart/CartButton";



const Header=()=> {


  const isAuthenticated =useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const cartStatus = useSelector(state => state.cart.status);
  const logoutHnadler = () => {
    dispatch(authActions.logout());
    alert('Logout successful!');
  }

  

  return (
    <header className="header-ribbon">
      <h1>Redux Auth</h1>
      {/* {isAuthenticated && ( */}
        <nav>
          <ul>
            <li>
              <a href="/">My products</a>
            </li>
            <li>
              <a href="/">My Sales</a>
            </li>
            <li>
              <button onClick={logoutHnadler}>Logout</button>
            </li>
            <li>
              <CartButton/>
            </li>
            <li>
              {cartStatus === 'pending' && <span style={{ color: 'orange' }}>Sending...</span>}
              {cartStatus === 'success' && <span style={{ color: 'green' }}>Sent ✔</span>}
              {cartStatus === 'error' && <span style={{ color: 'red' }}>Send Failed ✖</span>}
            </li>
          </ul>
      </nav>
    {/* )} */}
      
    </header>
  );
}

export default Header;