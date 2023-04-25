require("dotenv").config();

const password = process.env.DATABASE_PASSWORD;
const bcrypt = require("bcrypt");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "dev",
  password: password,
  database: "ecommerce",
  host: "localhost",
  port: 5432,
});

const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 0) {
      res.status(404).send("No users found");
    }
    res.status(200).send(results.rows);
  });
};

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows[0]);
      }
    );
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows[0]);
    });
  });
};

const getUserDataById = async (req, res) => {
  const id = req.params.id;
  pool.query("SELECT username, firstName, lastName, email FROM users WHERE id = $1", [id], (error,results) => {
    if(error){
      res.status(500).send("internal server error")
      return;
    }
    res.send(results.rows)
  })
};

const createNewUser = (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  pool.query(
    "SELECT * FROM users WHERE username = $1 OR email = $2",
    [username, email],
    (error, results) => {
      if (error) {
        res.status(500).send("Internal server error");
        return;
      }

      if (results.rows.length > 0) {
        // User with this username or email already exists
        res.status(409).send("Username or email already exists");
        return;
      }

      pool.query(
        "INSERT INTO users (username,password,firstName,lastName,email) VALUES ($1,$2,$3,$4,$5)",
        [username, hashedPassword, firstName, lastName, email],
        (error, results) => {
          if (error) {
            res.status(500).send("Internal server error");
            return;
          }
          res.status(201).send("User added successfully");
        }
      );
    }
  );
};

const updateUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    let sql = "UPDATE users SET ";
    if (password && email) {
      sql += `password = '${hashedPassword}', email = '${email}' `;
    } else if (password) {
      sql += `password = '${hashedPassword}' `;
    } else if (password) {
      sql += `email = '${email}' `;
    } else {
      return res.status(400).send("No updates provided");
    }
    sql += `WHERE id = ${req.params.id}`;

    await pool.query(sql);
    res.status(202).send("User successfully updated");
  } catch (error) {
    res.status(500).send("Could not update user");
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    await pool.query(`DELETE FROM users WHERE id = '${id}'`);
    res.status(204).send("User successfully deleted");
  } catch (error) {
    res.status(404).send("Could not delete user");
  }
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  getUserDataById
};
