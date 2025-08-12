import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartFromAPI } from "./store/cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
    const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCartFromAPI()); // ✅ load cart if logged in
    }
  }, [token, dispatch]);
  return (
    <>
      <Router>
        <Header />
      </Router>
    </>
  );
}

export default App;
