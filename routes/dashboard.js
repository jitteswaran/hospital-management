const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const scheduledAppointments = await Appointment.countDocuments({ status: 'Scheduled' });
    const recentAppointments = await Appointment.find()
      .populate('patient', 'name')
      .populate('doctor', 'name specialization')
      .sort({ createdAt: -1 })
      .limit(5);

    res.render('dashboard/index', {
      title: 'Dashboard - Hospital Management',
      user: req.session.user,
      stats: { totalPatients, totalDoctors, totalAppointments, scheduledAppointments },
      recentAppointments
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
