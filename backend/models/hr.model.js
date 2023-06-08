const db = require("./index");
const Sequelize = require("sequelize");

// SET SEQUELIZE INSTANCE VALUE
// SEQUELIZE- Using sequelize.define
module.exports = db.sequelize.define(
	"user",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		firstName: {
			type: Sequelize.STRING,
		},
		lastName: {
			type: Sequelize.STRING,
		},
		email: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
		},
		created: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
		},
	},
	// SEQUELIZE- disable automatic date assign
	{
		timestamps: false,
	}
);

