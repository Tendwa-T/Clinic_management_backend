const Login = require('../models/LoginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const logIn = async (req, res) => {
    try {
        const login = await Login.findByEmail(req.body.email);
        if (!login) {
            return res.status(404).json({ message: 'Login Credentials not found' });
        }
        const isMatch = await bcrypt.compare(req.body.password, login.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        login.isLoggedIn = true;
        await login.save();
        const token = jwt.sign({ email: login.email, staffID, loggedIn: login.isLoggedIn }, process.env.JWT_SECRET, { expiresIn: "12h" });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const logOut = async (req, res) => {
    try {
        const login = await Login.findByEmail(req.body.email);
        if (!login) {
            return res.status(404).json({ message: 'Login Credentials not found' });
        }
        login.isLoggedIn = false;
        await login.save();
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const validateLogin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.loggedIn === false) return res.status(401).json({ message: 'Unauthorized' });

        res.status(200).json('Authorized');
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const signUp = async (doctorInfo) => {
    try {
        const existingLogin = await Login.findByEmail(doctorInfo.email);
        if (existingLogin) {
            return res.status(400).json({ message: 'Login already exists', Redirect: '/login' });
        };
        const login = await Login.create({
            email: doctorInfo.email,
            staffID: doctorInfo.staffId,
            password: doctorInfo.staffId,
            role: doctorInfo.role,
        });
        return login;
    } catch (error) {
        return error.message
    }
};

const updateLogin = async (req, res) => {
    try {
        const login = await Login.findByEmail(req.body.email);
        if (!login) {
            return res.status(404).json({ message: 'Login not found' });
        }
        if (req.body.email) {
            login.email = req.body.email;
        }
        if (req.body.password) {
            login.password = req.body.password;
        }
        await login.save();
        res.status(200).json({ message: 'Login credentials updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    logIn,
    logOut,
    validateLogin,
    signUp,
    updateLogin,
};