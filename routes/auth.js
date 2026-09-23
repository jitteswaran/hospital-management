const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET Login
router.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('auth/login', { title: 'Login - Hospital Management', error: null });
});

// POST Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.render('auth/login', { title: 'Login', error: 'Invalid email or password' });
    }
    req.session.user = { id: user._id, name: user.name, role: user.role };
    res.redirect('/dashboard');
  } catch (err) {
    res.render('auth/login', { title: 'Login', error: 'Something went wrong' });
  }
});

// GET Register
router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Register - Hospital Management', error: null });
});

// POST Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.render('auth/register', { title: 'Register', error: 'Email already exists' });
    }
    const user = new User({ name, email, password, role });
    await user.save();
    res.redirect('/');
  } catch (err) {
    res.render('auth/register', { title: 'Register', error: 'Something went wrong' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
