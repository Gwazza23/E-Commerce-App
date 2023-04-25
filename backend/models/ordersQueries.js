const password = process.env.DATABASE_PASSWORD;
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "dev",
  password: password,
  database: "ecommerce",
  host: "localhost",
  port: 5432,
});

const getUserOrders = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT id AS order_id,created,status FROM orders WHERE user_id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        resolve(results.rows);
      }
    );
  });
};

const createOrder = (id) => {
  const date = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return new Promise(async (resolve, reject) => {
    const cart = await pool.query("SELECT * FROM cart WHERE user_id = $1", [
      id,
    ]);
    if (cart.rows.length === 0) {
      throw new Error("The cart is empty");
    }

    try {
      //create order
      pool.query(
        "INSERT INTO orders (user_id,created,status) VALUES ($1,$2,$3)",
        [id, date, "pending"],
        (error, results) => {
          if (error) {
            throw error;
          }
          pool.query(
            "INSERT INTO orders_products (order_id, product_id, quantity) SELECT orders.id,products.id,cart.quantity FROM orders,products,cart WHERE cart.product_id = products.id AND cart.user_id = orders.user_id AND cart.user_id = $1",
            [id],
            (error, results) => {
              if (error) {
                throw error;
              }
              pool.query(
                "DELETE FROM cart WHERE user_id = $1",
                [id],
                (error, results) => {
                  if (error) {
                    throw error;
                  }
                  resolve(results.rows);
                }
              );
            }
          );
        }
      );
    } catch (error) {
      throw error;
    }
  });
};

const deleteOrder = (order_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "DELETE FROM orders WHERE id = $1",
      [order_id],
      (error, results) => {
        if (error) {
          throw error;
        }
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getUserOrders,
  createOrder,
  deleteOrder,
};
