//cd OneDrive\Documents\Project\createDB

// create server here - express
//import express
const express = require('express');
const cors = require('cors');

require('dotenv').config();

//create app
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
  };

// app.use(cors(corsOptions));
//to allow input using JSON format
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//connect database
const db = require('./models');

//sync database
db.sequelize.sync({force:true}).then(()=>{
    console.log('All models are sync-ed')
});
const users = require('./controllers/user.controller');
app.post('/register', users.register);

app.post('/login', users.login);
// import all router and pass app
require('./routes/emp.route.js')(app);
require('./routes/user.route.js')(app);

// listen to port
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log("listening on port "+ PORT);
});

