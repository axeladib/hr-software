const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// CREATE SEQUELIZE INSTANCE
const db = {};

// DEFINE SEQUALIZE INSTANCE
// SEQUELIZE- Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

// RETURN SEQUELIZE INSTANCE
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;