//declare a library of controller
const db = require('../models');

const employees = {};
//declare all in function
//request will be handled by route module

//CRUD operation for model
employees.insert = (req,res) => {
    
    
    const Emp = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age

    };
    
    db.Employee.create(Emp)
    .then(data=>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'error adding data to database'});
    });

};

//retrieve instance
    //retrieve all instances>>>
employees.retrieveAll = (req,res)=> {
    db.Employee.findAll()
    .then(data=>{
        res.send(data);
    });
};
    //retrieve 1 instance by PK>>>
employees.retrieveID = (req,res) => {

    const id = req.params.id;
    db.Employee.findByPk(id)
    .then(data =>{
        if(data){
            res.send(data.firstName);
        }else{
            res.status(404).send('Error 404 not found');
        }
    })
    .catch(err=>{
        res.status(500).send('error retrieving 500');
    });
};


//update instance
    //search by first name
employees.updateID = (req,res) => {

    const name = req.params.name;
    db.Employee.findOne({where: {
        firstName: name
    }})
    .then(data =>{
        if(data){
            data.update({
                age: req.body.age
            });
            res.send(data);
        }else{
            res.status(404).send('Error 404 not found');
        }
    })
    .catch(err=>{
        res.status(500).send('error retrieving 500');
    });
};


//delete instance

module.exports = employees;
