



// import React, { use } from 'react';
// // import { Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// import Counter from './components/Counter';
// import Header from './components/Header/header';
// import ProfilePage from './components/ProfilePage';
// import CartButton from './components/Cart/CartButton';
// import CartList from './components/Cart/CartList';
// import ItemForm from './components/Shop/ItemForm';
// import { useEffect } from 'react';
// import { fetchCartFromAPI } from './store/cart'; // Assuming you have an action to fetch cart items
// import { useDispatch } from 'react-redux';
// import LoginPage from './components/Authentication/LoginPage';

// // import ForgotPasswordPage from './components/auth/ForgotPasswordPage';



// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchCartFromAPI());
//   }, [dispatch]);

//   useEffect(() => {
//     fetch('https://daily-expenses-app-53b16-default-rtdb.firebaseio.com/cart.json');
//   }, []);
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//   return (
//     <>
//       <Header />
//       <LoginPage/>
//       {/* {!isAuthenticated && <AuthPage/>}
//       {isAuthenticated && <ProfilePage />}
//       <Counter /> */}
  
//       <CartList />
//       <ItemForm/>
//     </>
//   );
// }

// export default App;


//   // "redux": "^5.0.1"
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/Header/header';
import CartList from './components/Cart/CartList';
import ItemForm from './components/Shop/ItemForm';
import LoginPage from './components/Authentication/LoginPage';
import { fetchCartFromAPI } from './store/cart';

// Protected Route
function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Fetch cart only after login
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCartFromAPI());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/items"
          element={
            <ProtectedRoute>
              <div>
                <h2>ADD Expense</h2>
                <ItemForm />
                <CartList />
              </div>
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
