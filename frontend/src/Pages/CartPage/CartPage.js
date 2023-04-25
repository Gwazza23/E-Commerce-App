import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

import "./CartPage.css";
import { fetchUserCart, removeItemFromCart, selectCart } from "../../Slices/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartData = useSelector(selectCart).cartData;

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/cart/${id}`, {
        withCredentials: true,
      });
      dispatch(removeItemFromCart(id))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchUserCart);
  }, [dispatch]);

  if (cartData.length <= 0) {
    return <h2>No Items in the cart</h2>;
  }

  return (
    <div className="cart-page-div">
      <div className="cart-container">
        <h2>CART</h2>
        <div className="cart-item-container">
          {cartData.map((item) => {
            return (
              <Link className="link" to={`/products/${item.id}`}>
                <motion.div
                  className="cart-item"
                  whileHover={{ backgroundColor: "#4DA8DA" }}
                >
                  <img
                    src={item.img_url}
                    alt={item.name}
                    width="75px"
                    height="75px"
                  />
                  <h3 style={{ color: "white" }}>
                    {item.name} x {item.quantity}{" "}
                  </h3>
                  <h4 style={{ color: "white" }}>Price: {item.total_price}</h4>
                  <motion.p
                    className="remove-item"
                    whileHover={{ color: "white" }}
                    onClick={(event) => {
                      event.preventDefault();
                      handleRemoveItem(item.id);
                    }}
                  >
                    &times;
                  </motion.p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
