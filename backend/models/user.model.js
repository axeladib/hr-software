
const User = (sequelize,Sequelize,DataTypes) => sequelize.define('user',{
    username:{
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        validate: {
            len: [5,10],
            isAlphanumeric: true            
        }
    },
    //setter efor hashed password
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // is: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/ //regex            
        }

    },
    email: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
    }
);

module.exports = User;