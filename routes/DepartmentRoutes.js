const express = require('express');
const router = express.Router();
const {
    registerDepartment,
    getDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment,
} = require('../controllers/DepartmentController');

router.post('/register', registerDepartment);
router.get('/', getDepartments);
router.get('/:id', getDepartment);
router.put('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);

module.exports = router;