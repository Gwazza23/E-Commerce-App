const express = require("express");
const ordersRouter = express.Router();
const db = require('../models/ordersQueries')

ordersRouter.get("/", async(req,res) => {
    try{
        const order = await db.getUserOrders(req.cookies.userId)
        res.status(200).send(order)
    }catch(error){
        res.status(400).send("Bad Request")
    }
})

ordersRouter.post("/", async(req,res) => {
    try{
        const order = await db.createOrder(req.cookies.userId)
        res.status(200).send(order)
    }catch(error){
        res.status(400).send("Bad Request")
    }
})

ordersRouter.delete("/delete/:id", async(req,res) => {
    try {
        const order = await db.deleteOrder(req.params.id)
        res.status(204).send(order)
    } catch(error) {
        res.status(400).send("Bad Request")
    }
})
module.exports = ordersRouter