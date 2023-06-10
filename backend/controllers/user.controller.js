const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const users = {};
//add new user
users.register  = async (req,res) => {
    //validate all required field
    if(!req.body.username || !req.body.password || !req.body.email){
        res.send("all fields are required!");
        return;
    }

    const hash = await bcrypt.hash(req.body.password, saltRounds);

    const user = {
        username: req.body.username,
        password: hash,
        email: req.body.email,
        employee: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
        }
    }
        
    db.User.create(user,{include: [db.Employee]})
    .then((data)=>{
        res.send(data.username+' is successfully added to db');   
    })
    .catch((err)=>{
        res.status(500).send(err.message || 'failed');
    });
}

//get all users
users.retrieveAll = (req,res) => {
    //validate user, only admin has access
    if(req.body.username !== 'admin' && req.body.password !== 'admin123'){
        res.send('only admin has access to this page');
        return;
    }

    db.User.findAll()
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message || 'fail to retrieve');
    })

};
//get one user
users.retrieveUser = (req,res) => {

    db.User.findOne({
        where:{username: req.user.username},
        include: db.Employee
    })
    .then((data)=>{
        if(data){
            res.send(data);
        }
        else{
            res.status(404).send("error 404");
        }
    })
    .catch(err=>{
        res.status(500).send(err.message);
    })

};
//login
users.login = async (req,res) => {
    const {username,password} = req.body;
    const userDB = await db.User.findOne({where: {username: username}});

    if(userDB){
        bcrypt.compare(password, userDB.password)
        .then(match=>{
            if(match){
                res.send(generateAccessToken(userDB.username));
            }
            else{
                res.status(400).send('password doesnt match');
            }
            })
        .catch(err=>{
            res.status(500).send(err.message); 
        });
    }
    else{
        res.status(404).send('username doesn\'t exist');
    }
}
//generate access token function
function generateAccessToken(username){
    return jwt.sign({username: username},process.env.TOKEN_SECRET,{expiresIn: '30m', algorithm: 'HS256'});
}
users.authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>{
        if(err) res.sendStatus(403);

        req.user = user

        next();
    });

}
//edit user details
users.updateUser = (req,res) => {

};
//delete one user
users.delUser = (req,res) => {

};
//delete all user
users.delAll = (req,res) => {

};

module.exports = users;