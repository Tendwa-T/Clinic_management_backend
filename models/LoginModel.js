const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('Login', loginSchema);