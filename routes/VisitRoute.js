const express = require('express');
const router = express.Router();
const {
    registerVisit,
    getVisits,
    getVisit,
    updateVisit,
    deleteVisit,
    getPatientVisits,
} = require('../controllers/VisitController');

router.post('/register', registerVisit);
router.get('/', getVisits);
router.get('/:id', getVisit);
router.put('/:id', updateVisit);
router.delete('/:id', deleteVisit);
router.get('/patient/:id', getPatientVisits);

module.exports = router;
