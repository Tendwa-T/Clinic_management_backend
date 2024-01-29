const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    staffID: { type: Number, required: true, unique: true, select: false },
    password: { type: String, default: this.staffID, required: true },
    role: { type: String, required: true, default: 'Secretary' },
    isLoggedIn: { type: Boolean, required: true, default: false },
});

loginSchema.statics.findByEmail = async function (email) {
    try {
        const login = await this.findOne({ email });
        return login;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model('Login', loginSchema);