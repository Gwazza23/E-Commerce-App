const express = require("express");
const cartRouter = express.Router();
const db = require("../models/cartQueries");

cartRouter.get("/", async (req, res) => {
  try {
    const cart = await db.getUserCart(req.cookies.userId);
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send("Bad Request");
  }
});

cartRouter.post("/", async (req, res) => {
  const { product_id, quantity } = req.body;
  try {
    const cart = await db.addItemToCart(
      req.cookies.userId,
      product_id,
      quantity
    );
    res.status(201).send(cart);
  } catch (error) {
    res.status(400).send("Bad Request");
  }
});

cartRouter.put("/", async (req, res) => {
  const { product_id, quantity } = req.body;
  try {
    const cart = await db.updateItemInCart(
      req.cookies.userId,
      product_id,
      quantity
    );
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send("Bad Request");
  }
});

cartRouter.delete("/", async (req, res) => {
  const { product_id } = req.body;
  try {
    const cart = await db.deleteItemInCart(req.cookies.userId, product_id);
    res.status(204).send(cart);
  } catch (error) {
    res.status(400).send('Bad Request')
  }
});

module.exports = cartRouter;
