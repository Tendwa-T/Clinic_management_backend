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
    cookie: {
        secure: false,
        maxAge: 300000, //5 minutes
    }
}));

app.use(flash());

connectDB();

//ROUTE IMPORTS
const patientRoutes = require('./routes/PatientRoutes');

//APP ROUTES
app.use('/api/v0/patient', patientRoutes);

app.get('/', (req, res) => {
    console.log(new Date().toDateString(), ",", new Date().toTimeString());
    req.flash('success', 'API online...');
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})