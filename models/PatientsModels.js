const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nationalID: { type: Number, required: true, unique: true, minlength: 7 },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true, unique: true, minlength: 10, maxlength: 10 },
}, { timestamps: true });

patientSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

//find the patient by national ID
patientSchema.statics.findByNationalID = function (nationalID) {
    return this.findOne({ nationalID });
};

module.exports = mongoose.model('Patient', patientSchema);