const password = process.env.DATABASE_PASSWORD;
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "dev",
  password: password,
  database: "ecommerce",
  host: "localhost",
  port: 5432,
});

const getUserCart = (id) => {
    return new Promise((resolve,reject) => {
        pool.query("SELECT products.name, cart.quantity FROM cart,products WHERE products.id = cart.product_id AND user_id= $1", [id], (error,results) => {
            if(error){
                reject(error)
            }
            resolve(results.rows)
        })
    })
}

const addItemToCart = (user_id,product_id,quantity) => {
    return new Promise((resolve,reject) => {
        pool.query("INSERT INTO cart (user_id,product_id,quantity) VALUES ($1,$2,$3)", [user_id,product_id,quantity], (error,results) => {
            if(error){
                reject(error)
            }
            resolve('Item sucessfully added to the cart')
        } )
    })
}

const updateItemInCart = (user_id,product_id,quantity) => {
    return new Promise((resolve,reject) => {
        pool.query("UPDATE cart SET quantity = $3 WHERE product_id = $2 AND user_id = $1", [user_id,product_id,quantity], (error,results) => {
            if(error){
                reject(error)
            }
            resolve('Item successfully updated in the cart')
        })
    })
}

const deleteItemInCart = (user_id,product_id) => {
    return new Promise((resolve,reject) => {
        pool.query("DELETE FROM cart WHERE product_id = $2 AND user_id = $1 " , [user_id,product_id], (error,results) => {
            if(error){
                reject(error)
            }
            resolve('Item was successfully removed from the cart')
        })
    })
}

module.exports = {
    getUserCart,
    addItemToCart,
    updateItemInCart,
    deleteItemInCart
}