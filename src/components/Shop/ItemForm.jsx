import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToAPI } from '../../store/cart'; // Assuming you have an action to add items
import './itemform.css';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");


  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || quantity <= 0 || price <= 0) return;

    dispatch(addItemToAPI({name,quantity,price: parseInt(price),}));

    setName('');
    setQuantity('');
    setPrice('');

  };

  // const total= quantity * price;

  return (
    <form className="itemform-container" onSubmit={submitHandler}>
      <h2>Add Item</h2>
      <label htmlFor="item-name">Item Name</label>
      <input
        id="item-name"
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      
      <label htmlFor="item-quantity">Quantity</label>
      <input
        id="item-quantity"
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        required
      />
      
      <label htmlFor="item-price">Price</label>
      <input
        id="item-price"
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        min="10"
        required
      />
      {/* <p>Total: ₹{total}</p> */}
      <p>Total: ₹{quantity && price ? quantity * price : 0}</p>
      
      <button type="submit">Add to Cart</button>
    </form>
  );
};

export default ItemForm;
