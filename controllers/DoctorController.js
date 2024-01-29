const Doctor = require('../models/DoctorsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { signUp } = require('./LoginController');
const { updateDepartment } = require('./DepartmentController');

const registerDoctor = async (req, res) => {
    if (!req.body.firstName) {
        return res.status(400).json({ message: 'Please enter your first name' });
    }
    if (!req.body.lastName) {
        return res.status(400).json({ message: 'Please enter your last name' });
    }
    if (!req.body.nationalID) {
        return res.status(400).json({ message: 'Please enter your national ID' });
    }
    if (!req.body.email) {
        return res.status(400).json({ message: 'Please enter your email' });
    }
    if (!req.body.phoneNumber) {
        return res.status(400).json({ message: 'Please enter your phone number' });
    }
    if (!req.body.department) {
        return res.status(400).json({ message: 'Please enter your department' });
    }

    try {
        const existingDoctor = await Doctor.findByNationalID(req.body.nationalID);
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor already exists' });
        };
        const doctor = await Doctor.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationalID: req.body.nationalID,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            department: req.body.department,
        });
        const doctorInfo = {
            email: doctor.email,
            staffId: doctor.staffID,
            role: 'Doctor',
        };
        signUp(doctorInfo);


        res.status(201).json({ doctor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({ doctors });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json({ doctor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByNationalID(req.params.nationalID);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        if (req.body.firstName) {
            doctor.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            doctor.lastName = req.body.lastName;
        }
        if (req.body.email) {
            doctor.email = req.body.email;
        }
        if (req.body.phoneNumber) {
            doctor.phoneNumber = req.body.phoneNumber;
        }
        if (req.body.department) {
            doctor.department = req.body.department;
        }

        await doctor.save();
        res.status(200).json({ doctor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByNationalID(req.params.nationalID);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        await doctor.remove();
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerDoctor,
    getDoctors,
    getDoctor,
    updateDoctor,
    deleteDoctor,
};