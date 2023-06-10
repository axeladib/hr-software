const Employee = (sequelize,Sequelize,DataTypes) => sequelize.define('employee',{
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    }
});

module.exports = Employee;