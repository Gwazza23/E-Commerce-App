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

usersRouter.get("/profile/:id", db.getUserDataById);

usersRouter.post("/register", db.createNewUser);

usersRouter.put("/:id", db.updateUser);

usersRouter.delete("/:id", db.deleteUser);

usersRouter.get("/login", (req, res) => {
  res.send("Log in");
});

usersRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send("Incorrect username or password");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.regenerate(() => {
        res.cookie("user_id", req.user.id);
        res.send("You are now logged in!");
      });
    });
  })(req, res, next);
});

usersRouter.get('/logout', (req,res) => {
  req.logout(() =>{})
  res.send('you are logged out')
})

module.exports = usersRouter;
