const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

// CORS- Simple Usage (Enable All CORS Requests)
app.use(cors());
// BODYPARSER- parse application/json
app.use(bodyParser.json());
// BODYPARSER- parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const Users = require("./routes/hr.routes");

app.use("/users", Users);

// SEQUELIZE- Database safety check
const db = require("./models");
db.sequelize.sync();

app.get("/", (req, res) => {
	res.json({ message: "Welcome to HR Software." });
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
