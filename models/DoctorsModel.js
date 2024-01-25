const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    staffID: { type: Number, required: true, unique: true, default: generateStaffID() },
    nationalID: { type: Number, required: true, unique: true, },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true, unique: true, minlength: 10, maxlength: 10 },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
});

doctorSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

function generateStaffID() {
    return Math.floor(Math.random() * 10000);
};

module.exports = mongoose.model('Doctor', doctorSchema);