const Patient = require('../models/PatientsModels');

const registerPatient = async (req, res) => {
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

    try {
        const existingPatient = await Patient.findByNationalID(req.body.nationalID);
        if (existingPatient) {
            return res.status(400).json({ message: 'Patient already exists' });
        };
        const patient = await Patient.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationalID: req.body.nationalID,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        });
        res.status(201).json({ patient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        if (patients.length === 0) {
            req.flash('error', 'No patients found');
            return res.status(404).json({ message: 'No patients found' });
        }
        res.status(200).json({ patients });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found. Search by NationalID' });
        }
        res.status(200).json({ patient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPatientByNationalID = async (req, res) => {
    try {
        const patient = await Patient.findByNationalID(req.params.nationalID);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ patient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePatientByNationalID = async (req, res) => {
    try {
        const patient = await Patient.findByNationalID(req.params.nationalID);
        if (req.body.firstName) {
            patient.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
            patient.lastName = req.body.lastName;
        }
        if (req.body.email) {
            patient.email = req.body.email;
        }
        if (req.body.phoneNumber) {
            patient.phoneNumber = req.body.phoneNumber;
        }
        if (req.body.nationalID) {
            return res.status(400).json({ message: 'National ID cannot be changed. Contact System Administrator' });
        }
        await patient.save();
        res.status(200).json({ patient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePatientByNationalID = async (req, res) => {
    try {
        const patient = await Patient.findByNationalID(req.params.nationalID);
        await patient.deleteOne();
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerPatient,
    getPatients,
    getPatient,
    getPatientByNationalID,
    updatePatientByNationalID,
    deletePatientByNationalID,
};
