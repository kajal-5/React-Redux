



import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Counter from './components/Counter';
import Header from './components/Header/header';
import ProfilePage from './components/ProfilePage';
import CartButton from './components/Cart/CartButton';
import CartList from './components/Cart/CartList';
import ItemForm from './components/Shop/ItemForm';
import { useEffect } from 'react';
import { fetchCartFromAPI } from './store/cart'; // Assuming you have an action to fetch cart items
import { useDispatch } from 'react-redux';
import LoginPage from './components/Authentication/LoginPage';

// import ForgotPasswordPage from './components/auth/ForgotPasswordPage';



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartFromAPI());
  }, [dispatch]);

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return (
    <>
      <Header />
      <LoginPage/>
      {/* {!isAuthenticated && <AuthPage/>}
      {isAuthenticated && <ProfilePage />}
      <Counter /> */}
  
      <CartList />
      <ItemForm/>
    </>
  );
}

export default App;


  // "redux": "^5.0.1"
