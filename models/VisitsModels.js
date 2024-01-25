const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true, default: Date.now() },
    timeIn: { type: Date, required: true, default: Date.now().toLocaleString() },
    triage_notes: { type: String, required: true, default: 'No notes' },
    doctors_notes: { type: String, required: true, default: 'No notes' },
    lab_notes: { type: String, required: true, default: 'No notes' },
    pharmacy_notes: { type: String, required: true, default: 'No notes' },
    isActive: { type: Boolean, required: true, default: true },
    timeOut: { type: Date, required: true, default: null },
});

module.exports = mongoose.model('Visit', visitSchema);