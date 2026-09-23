const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  experience: { type: Number },
  availability: { type: String, default: 'Available' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doctor', doctorSchema);
