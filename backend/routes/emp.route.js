//pass app(express) to export all route
module.exports = app =>{
//import all controller
const employees = require('../controllers/emp.controller.js');
//initialize router
var router = require('express').Router();
//all route lists
//handle all CRUD requests
router.post('/', employees.insert);

router.get('/', employees.retrieveAll);

router.get('/:id', employees.retrieveID);

router.post('/update/:name', employees.updateID);


//assign route to app
app.use('/api/employees',router);
};
