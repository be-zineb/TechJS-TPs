const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

router.get('/register', (req, res) => res.render('register'));
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await new User({ username, password: hashed }).save();
  res.redirect('/login');
});

router.get('/login', (req, res) => res.render('login'));
router.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/login'));
});

module.exports = router;
