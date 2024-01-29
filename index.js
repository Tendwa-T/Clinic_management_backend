require('dotenv').config();
const express = require('express');
const cors = require('cors');
const flash = require('express-flash');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./configs/db');

process.env.TZ = 'Africa/Nairobi';


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());

connectDB();

//ROUTE IMPORTS
const patientRoutes = require('./routes/PatientRoutes');
const doctorRoutes = require('./routes/DoctorRoutes');
const DepartmentRoutes = require('./routes/DepartmentRoutes');
const visitRoutes = require('./routes/VisitRoute');
const appointmentRoutes = require('./routes/AppointmentsRoutes');


//APP ROUTES
app.use('/api/v0/patient', patientRoutes);
app.use('/api/v0/doctor', doctorRoutes);
app.use('/api/v0/department', DepartmentRoutes);
app.use('/api/v0/visit', visitRoutes);
app.use('/api/v0/appointment', appointmentRoutes);


app.get('/', (req, res) => {
    req.flash('success', 'API online...');
    res.send('Hello World');
});



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})