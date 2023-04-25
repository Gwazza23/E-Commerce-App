import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct, selectProducts } from "../../Slices/productsSlice";
import { motion } from "framer-motion";
import axios from "axios";

import "./ProductPage.css";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage ] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const itemData = useSelector(selectProducts).itemData[0];

  const handleQuantityChange = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if(!quantity){
      setMessage("Please select a quantity")
      return
    }
    try {
      await axios.post(
        `http://localhost:4000/cart/`,
        {
          product_id : id,
          quantity,
          price: itemData?.price
        },
        {
          withCredentials: true,
        }
      );
      setMessage("Item Successfully added to cart!")
    } catch (error) {
      console.error(error.response.data);
      setMessage(error.response.data);
    }
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  return (
    <div className="product-page-div">
      <div className="product-page-header">
        <h2>{itemData?.name}</h2>
      </div>
      <div className="product-page-info">
        <div className="product-page-image">
          <motion.img
            src={itemData?.img_url}
            whileHover={{ scale: 1.1, transition: { ease: "easeInOut" } }}
          />
        </div>
        <div className="product-page-description">
          <h3>Item Description</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="product-page-cart">
          <h4 className="product-page-price">{itemData?.price}</h4>
          <h5 className="product-page-quantity">
            Amount left: {itemData?.quantity}
          </h5>
          <div className="product-page-cart-details">
            <div className="product-page-cart-quantity">
              <h5>Select Quantity</h5>
              <input
                min={"1"}
                max={itemData?.quantity}
                type="number"
                onChange={handleQuantityChange}
              />
            </div>
            <p
              className="product-page-cart-info"
              style={{ fontSize: "0.8rem" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="product-page-button">
              <button onClick={handleAddToCart}>Add To Cart</button>
            </div>
            { message && <div className="error">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
