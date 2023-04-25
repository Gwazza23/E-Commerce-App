import React, { useEffect } from "react";
import { Outlet } from "react-router";

import "./Header.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { fetchUserData, resetAuth } from "../../Slices/usersSlice";
import { fetchUserCart } from "../../Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../Slices/usersSlice";
import axios from "axios";
import { motion } from "framer-motion";

export default function Header() {
  const dispatch = useDispatch();
  const data = useSelector(selectUser).data[0];
  const user_id = Cookies.get("user_id");

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      await axios.get("http://localhost:4000/users/logout");
      Cookies.remove("connect.sid");
      Cookies.remove("user_id");
      dispatch(resetAuth());
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (user_id) {
      dispatch(fetchUserData(user_id));
      dispatch(fetchUserCart(user_id));
    }
    return () => {};
  }, [user_id, dispatch]);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0, transition: { duration: 0.3 } }}
      animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
      exit={{ y: -50, opacity: 0, transition: { duration: 0.3 } }}
    >
      <div className="header-div">
        <Link className="link" to={"/"}>
          <h1 className="logo">
            Style<span>Crate</span>
          </h1>
        </Link>
        <input type="text" placeholder="Search the store" />
        {!user_id ? (
          <div className="header-div-profile">
            <Link className="link" to={"/login"}>
              <p className="header-div-p">Log In</p>
            </Link>
          </div>
        ) : (
          <>
            <div className="header-div-profile">
              <img src="/images/user.png" alt="default user icon" />
              <p>{data?.username}</p>
            </div>

            <Link to={"/cart"}>
              <div className="cart">
                <img src="/images/cart.png" alt="default cart icon" />
              </div>
            </Link>

            <div className="logout" onClick={handleClick}>
              <Link to={"/login"}>
                <img src="/images/logout.png" alt="logout icon" />
              </Link>
            </div>
          </>
        )}
      </div>
      <Outlet />
    </motion.div>
  );
}
