const Appointment = require('../models/AppointmentsModel');

const registerAppointment = async (req, res) => {
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
        const existingAppointment = await Appointment.findByNationalID(req.body.nationalID);
        if (existingAppointment) {
            return res.status(400).json({ message: 'Appointment already exists' });
        };
        const appointment = await Appointment.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationalID: req.body.nationalID,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            department: req.body.department,
        });
        res.status(201).json({ appointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        res.status(200).json({ appointment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPatientAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientID: req.params.id });
        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        await appointment.updateOne(req.body);
        res.status(200).json({ message: 'Appointment updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        await appointment.deleteOne();
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registerAppointment,
    getAppointments,
    getAppointment,
    getPatientAppointments,
    updateAppointment,
    deleteAppointment,
}
