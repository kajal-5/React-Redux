import { useDispatch } from 'react-redux';
import { toggleCart } from '../../store/cart';
import { useSelector } from 'react-redux';

const CartButton = () => {
  // const items = useSelector(state => state.cart.items);
  const cartItems = useSelector(state => state.cart.items);
  // const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(toggleCart())}>Cart({cartItems.length})</button>;
};

export default CartButton;
