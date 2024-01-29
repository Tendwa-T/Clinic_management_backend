const mongoose = require('mongoose');
const Department = require('./DepartmentModel');

const doctorSchema = new mongoose.Schema({
    staffID: { type: Number, required: true, unique: true, default: generateStaffID() },
    nationalID: { type: Number, required: true, unique: true, },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true, minlength: 10, maxlength: 10 },
    department: { type: String, default: getDeptID() },
});

doctorSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

function generateStaffID() {
    return Math.floor(Math.random() * 10000);
};

doctorSchema.statics.findByNationalID = async function (nationalID) {
    try {
        const doctor = await this.findOne({ nationalID });
        return doctor;
    } catch (error) {
        throw error;
    }
};

function getDeptID() {
    const dep = Department.findOne({ departmentName: this.department })
    return dep._id;
};

doctorSchema.pre('save', function (next) {
    this.department = getDeptID();
    next();
});

module.exports = mongoose.model('Doctor', doctorSchema);