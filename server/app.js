require('dotenv').config();
const express = require("express");
const {configDB} = require('./config/database');
const cookies = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 9000;
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const discussionRoutes = require('./routes/discussion.routes');
const userRoutes = require('./routes/user.routes');

// Configuring MongoDB routine
configDB();

app.use(cookies());
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
app.use('/discussion', discussionRoutes);
app.use('/user', userRoutes);

// Starting the backend server
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})