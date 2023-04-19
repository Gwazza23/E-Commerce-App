const express = require("express");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models/usersQueries");

usersRouter.use(passport.initialize());
usersRouter.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username);
      if (!user) {
        return done(null, false);
      }
      const matchedPassword = await bcrypt.compare(password, user.password);
      if (!matchedPassword) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  const user = db.getUserById(id, (err, done) => {
    if (err) {
      return done(err);
    }
  });
  done(null, user);
});

usersRouter.get("/", db.getAllUsers);

usersRouter.post("/register", db.createNewUser);

usersRouter.put("/:id", db.updateUser);

usersRouter.delete("/:id", db.deleteUser);

usersRouter.get("/login", (req, res) => {
  console.log(req.cookies.userId)
  res.send("Log in");
});

usersRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res.cookie("userId", req.user.id)
  res.send("This user exists!");
});

usersRouter.get("/logout", (req, res) => {
  req.logout(() => {});
  res.redirect("/login");
});

module.exports = usersRouter;
