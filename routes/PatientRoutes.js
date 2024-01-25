const express = require('express');
const router = express.Router();
const {
    registerPatient,
    getPatients,
    getPatient,
    getPatientByNationalID,
    updatePatientByNationalID,
    deletePatientByNationalID,
} = require('../controllers/PatientController');

router.post('/register', registerPatient);
router.get('/', getPatients);
router.get('/:id', getPatient); //get patient by _id
router.get('/nationalID/:nationalID', getPatientByNationalID); //get patient by nationalID
router.put('/:nationalID', updatePatientByNationalID); //update patient by nationalID
router.delete('/:nationalID', deletePatientByNationalID); //delete patient by nationalID

module.exports = router;