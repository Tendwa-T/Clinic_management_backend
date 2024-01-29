const Department = require('../models/DepartmentModel');

const registerDepartment = async (req, res) => {
    if (!req.body.departmentName) {
        return res.status(400).json({ message: 'Please enter department name' });
    }
    if (!req.body.departmentHeadPhoneNumber) {
        return res.status(400).json({ message: 'Please enter department head phone number' });
    }
    if (!req.body.departmentDescription) {
        return res.status(400).json({ message: 'Please enter department description' });
    }

    try {
        const existingDepartment = await Department.findByDepartmentName(req.body.departmentName);
        if (existingDepartment) {
            return res.status(400).json({ message: 'Department already exists' });
        };
        const department = await Department.create({
            departmentName: req.body.departmentName,
            departmentHeadPhoneNumber: req.body.departmentHeadPhoneNumber,
            departmentDescription: req.body.departmentDescription,
        });

        res.status(201).json({ department });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json({ departments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        res.status(200).json({ department });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        if (req.body.departmentName) {
            department.departmentName = req.body.departmentName;
        }
        if (req.body.departmentHead) {
            department.departmentHead = req.body.departmentHead;
        }
        if (req.body.departmentHeadEmail) {
            department.departmentHeadEmail = req.body.departmentHeadEmail;
        }
        if (req.body.departmentHeadPhoneNumber) {
            department.departmentHeadPhoneNumber = req.body.departmentHeadPhoneNumber;
        }
        if (req.body.departmentDescription) {
            department.departmentDescription = req.body.departmentDescription;
        }
        await department.save();
        res.status(200).json({ department });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        await department.remove();
        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registerDepartment,
    getDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment,
}