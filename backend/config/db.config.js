module.exports = {
	HOST: "localhost",
	USER: "root",
	PASSWORD: "123456",
	DB: "testdb",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};

// mysql -u root -p 
// CREATE DATABASE testdb
// SHOW DATABASES
// USE testdb
// QUIT