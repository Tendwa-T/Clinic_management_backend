const Visit = require('../models/VisitsModels');
const Patient = require('../models/PatientsModels');
const Doctor = require('../models/DoctorsModel');
const Department = require('../models/DepartmentModel');

const registerVisit = async (req, res) => {
    if (!req.body.patientID) {
        return res.status(400).json({ message: 'Please enter patient ID' });
    }
    if (!req.body.doctorID) {
        return res.status(400).json({ message: 'Please enter doctor ID' });
    }
    if (!req.body.departmentID) {
        return res.status(400).json({ message: 'Please enter department ID' });
    }
    if (!req.body.visitDate) {
        return res.status(400).json({ message: 'Please enter visit date' });
    }
    if (!req.body.visitReason) {
        return res.status(400).json({ message: 'Please enter visit reason' });
    }
    if (!req.body.visitDescription) {
        return res.status(400).json({ message: 'Please enter visit description' });
    }

    try {
        const visit = await Visit.create({
            patientID: req.body.patientID,
            doctorID: req.body.doctorID,
            departmentID: req.body.departmentID,
            visitDate: req.body.visitDate,
            visitReason: req.body.visitReason,
            visitDescription: req.body.visitDescription,
        });

        res.status(201).json({ visit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getVisits = async (req, res) => {
    try {
        const visits = await Visit.find();
        res.status(200).json({ visits });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getVisit = async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        res.status(200).json({ visit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateVisit = async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        if (!visit) {
            return res.status(404).json({ message: 'Visit not found' });
        }
        if (req.body.patientID) {
            visit.patientID = req.body.patientID;
        }
        if (req.body.doctorID) {
            visit.doctorID = req.body.doctorID;
        }
        if (req.body.departmentID) {
            visit.departmentID = req.body.departmentID;
        }
        if (req.body.visitDate) {
            visit.visitDate = req.body.visitDate;
        }
        if (req.body.visitReason) {
            visit.visitReason = req.body.visitReason;
        }
        if (req.body.visitDescription) {
            visit.visitDescription = req.body.visitDescription;
        }

        await visit.save();
        res.status(200).json({ visit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteVisit = async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        if (!visit) {
            return res.status(404).json({ message: 'Visit not found' });
        }
        await visit.remove();
        res.status(200).json({ message: 'Visit deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPatientVisits = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        const visits = await Visit.find({ patientID: req.params.id });
        res.status(200).json({ visits });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    registerVisit,
    getVisits,
    getVisit,
    updateVisit,
    deleteVisit,
    getPatientVisits,
}