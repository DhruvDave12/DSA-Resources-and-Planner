require('dotenv').config();
const express = require("express");
const {configDB} = require('./config/database');
const app = express();
const PORT = process.env.PORT || 9000;
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');

// Configuring MongoDB routine
configDB();

// parse data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
// use cors
app.use(cors(corsOptions));

app.use('/', authRoutes);
// Starting the backend server
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})