import React from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import RegisterPage from "../../RegisterPage/RegisterPage";
import LoginPage from "../../LoginPage/LoginPage";
import HomePage from "../../HomePage/HomePage";
import Header from "../../Header/Header";
import { AnimatePresence } from "framer-motion";
import ProtectedRoutes from "../ProtectedRoute/ProtectedRoute";
import ProductPage from "../../ProductPage/ProductPage";
import CategoryPage from "../../CategoryPage/CategoryPage";
import CartPage from "../../CartPage/CartPage";

export default function AnimatedRoutes() {
  const location = useLocation();

  let isAuth;

  if (document.cookie.includes("user_id")) {
    isAuth = true;
  } else {
    isAuth = false;
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<ProtectedRoutes auth={isAuth} />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path="products/:id" element={<ProductPage />}/>
          <Route path="category/:id" element={<CategoryPage />}/>
          <Route path="cart" element={ isAuth? <CartPage /> : <LoginPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
