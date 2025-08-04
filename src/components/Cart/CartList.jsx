import { useSelector, useDispatch } from 'react-redux';
// import { decreaseQuantity, increaseQuantity } from '../../store/cart';
import { increaseCartItem, decreaseCartItem } from '../../store/cart';
import './cartlist.css';


const CartList = () => {
  const { isVisible, items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if (!isVisible) return null;

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cartlist-container">
      <h2>Cart Items</h2>
      {items.map(item => (
        <div className="cartlist-item" key={item._id}>
          <p>{item.name} - ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
          <div>
            <button className="cartlist-btn" onClick={() => dispatch(decreaseCartItem(item))}>-</button>
            <button className="cartlist-btn" onClick={() => dispatch(increaseCartItem(item))}>+</button>
          </div>
        </div>
      ))}
      <h3>Total: ₹{totalPrice}</h3>
    </div>
  );
};

export default CartList;
