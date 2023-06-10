const jwt = require('jsonwebtoken');

module.exports = app => {
    const users = require('../controllers/user.controller.js');
    var router = require('express').Router();

    //all request
    // router.post('/register', users.addUser);

    // router.post('/login', users.login);

    router.get('/all', users.retrieveAll);

    router.get('/profile', users.authenticateToken,  users.retrieveUser);

    //pass address to access the api
    app.use('/api/user',router);
}

function authenticateToken (req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>{
        if(err) res.sendStatus(403);

        req.user = user

        next();
    });

}