const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//routes
const usersRouter = require("./routes/usersRoute");
const productsRouter = require("./routes/productsRoute");
const cartRouter = require("./routes/cartRoute");
const ordersRouter = require("./routes/ordersRoute");

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_PASSWORD,
    resave: false,
    saveUninitialized: false,
    cookie: { sameSite: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(bodyParser.json());
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/order", ordersRouter);

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
