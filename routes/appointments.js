const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, async (req, res) => {
  const appointments = await Appointment.find()
    .populate('patient', 'name')
    .populate('doctor', 'name specialization')
    .sort({ date: -1 });
  res.render('appointments/index', { title: 'Appointments', user: req.session.user, appointments });
});

router.get('/add', isAuthenticated, async (req, res) => {
  const patients = await Patient.find();
  const doctors = await Doctor.find();
  res.render('appointments/form', { title: 'Add Appointment', user: req.session.user, patients, doctors, appointment: null, error: null });
});

router.post('/add', isAuthenticated, async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.redirect('/appointments');
  } catch (err) {
    const patients = await Patient.find();
    const doctors = await Doctor.find();
    res.render('appointments/form', { title: 'Add Appointment', user: req.session.user, patients, doctors, appointment: null, error: 'Failed to add appointment' });
  }
});

router.post('/delete/:id', isAuthenticated, async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.redirect('/appointments');
});

router.post('/status/:id', isAuthenticated, async (req, res) => {
  await Appointment.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.redirect('/appointments');
});

module.exports = router;
