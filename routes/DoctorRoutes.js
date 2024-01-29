const express = require('express');
const router = express.Router();
const {
    registerDoctor,
    getDoctors,
    getDoctor,
    updateDoctor,
    deleteDoctor,
} = require('../controllers/DoctorController');


router.post('/register', registerDoctor);
router.get('/', getDoctors);
router.get('/:nationalID', getDoctor);
router.put('/:nationalID', updateDoctor);
router.delete('/:nationalID', deleteDoctor);

module.exports = router;