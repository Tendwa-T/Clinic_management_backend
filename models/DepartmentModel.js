const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentName: { type: String, required: true, unique: true },
    departmentHeadPhoneNumber: { type: String, required: true, unique: true, minlength: 10, maxlength: 10 },
    departmentDescription: { type: String, required: true },
    departmentStaff: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
});

departmentSchema.statics.findByDepartmentName = async function (departmentName) {
    try {
        const department = await this.findOne({ departmentName });
        return department;
    } catch (error) {
        throw error;
    }
};


module.exports = mongoose.model('Department', departmentSchema);
