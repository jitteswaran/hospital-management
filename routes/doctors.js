const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, async (req, res) => {
  const doctors = await Doctor.find().sort({ createdAt: -1 });
  res.render('doctors/index', { title: 'Doctors', user: req.session.user, doctors });
});

router.get('/add', isAuthenticated, (req, res) => {
  res.render('doctors/form', { title: 'Add Doctor', user: req.session.user, doctor: null, error: null });
});

router.post('/add', isAuthenticated, async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.redirect('/doctors');
  } catch (err) {
    res.render('doctors/form', { title: 'Add Doctor', user: req.session.user, doctor: null, error: 'Failed to add doctor' });
  }
});

router.get('/edit/:id', isAuthenticated, async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.render('doctors/form', { title: 'Edit Doctor', user: req.session.user, doctor, error: null });
});

router.post('/edit/:id', isAuthenticated, async (req, res) => {
  await Doctor.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/doctors');
});

router.post('/delete/:id', isAuthenticated, async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.redirect('/doctors');
});

module.exports = router;
