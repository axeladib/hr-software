const {Sequelize, DataTypes} = require('sequelize');

//connecting to database
const sequelize = new Sequelize('testdb', 'admin', 'admin123',{
                                host: 'localhost',
                                dialect: 'mysql',
                                //define pool on release lvl
});

try{
    sequelize.authenticate();
    console.log('connected...');
}catch(err){
    console.error('unable to connect', err);
}

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//initialize all entity in DB
db.Employee = require('./emp.model.js')(sequelize,Sequelize,DataTypes);
db.User = require('./user.model.js')(sequelize,Sequelize,DataTypes);

//describe all relations under here
db.User.hasOne(db.Employee,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

db.Employee.belongsTo(db.User);

module.exports = db;