const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, async (req, res) => {
  const patients = await Patient.find().sort({ createdAt: -1 });
  res.render('patients/index', { title: 'Patients', user: req.session.user, patients });
});

router.get('/add', isAuthenticated, (req, res) => {
  res.render('patients/form', { title: 'Add Patient', user: req.session.user, patient: null, error: null });
});

router.post('/add', isAuthenticated, async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.redirect('/patients');
  } catch (err) {
    res.render('patients/form', { title: 'Add Patient', user: req.session.user, patient: null, error: 'Failed to add patient' });
  }
});

router.get('/edit/:id', isAuthenticated, async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  res.render('patients/form', { title: 'Edit Patient', user: req.session.user, patient, error: null });
});

router.post('/edit/:id', isAuthenticated, async (req, res) => {
  await Patient.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/patients');
});

router.post('/delete/:id', isAuthenticated, async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.redirect('/patients');
});

module.exports = router;
