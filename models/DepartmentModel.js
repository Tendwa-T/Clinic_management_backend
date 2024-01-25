const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentName: { type: String, required: true, unique: true },
    departmentHead: { type: String, required: true },
    departmentHeadEmail: { type: String, required: true, unique: true },
    departmentHeadPhoneNumber: { type: String, required: true, unique: true, minlength: 10, maxlength: 10 },
    departmentDescription: { type: String, required: true },
    departmentStaff: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
});

module.exports = mongoose.model('Department', departmentSchema);
