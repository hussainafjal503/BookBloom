import "remixicon/fonts/remixicon.css";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import AllBook from "./pages/AllBook";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/viewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./slices/auth.slice";
import { useEffect } from "react";
import Favourites from "./components/Profile/Favourites";
import OrderHistory from "./components/Profile/OrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrder from "./components/Admin/AllOrder";
import AddBook from "./components/Admin/AddBook";
import NotFound from "./pages/NotFound";
import ProtectedAuth from "./pages/ProtectedAuth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedAuth />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route path="/allbooks" element={<AllBook />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Favourites />} />
          <Route path="profile/orderhistory" element={<OrderHistory />} />
          <Route path="profile/settings" element={<Settings />} />
          <Route path="profile/allorders" element={<AllOrder />} />
          <Route path="profile/addbooks" element={<AddBook />} />
          <Route path="/profile/update-book/:id" element={<AddBook />} />
        </Route>

        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
