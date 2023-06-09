const express = require("express");
const router = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/hr.model");
router.use(cors());

process.env.SECRET_KEY = "secret";

router.post("/register", (req, res) => {
	const today = new Date();

	// USER DATA FROM WEBPAGE
	const userData = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		password: req.body.password,
		created: today,
	};

	User.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then((user) => {
			// CASE 1: NEW USER VALID
			if (!user) {
				// BCRYPT- Technique 2 (auto-gen a salt and hash):
				const saltRounds = 10;
				bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
					// SEQUELIZE- Store hash in password DB.
					userData.password = hash;
					User.create(userData)
						.then((user) => {
							res.json({ status: user.email + "Registered!" });
						})
						.catch((err) => {
							res.send("error: " + err);
						});
				});
			} else {
				// CASE 2: NOT A NEW USER
				res.json({ error: "User already exists" });
			}
		})
		// CASE 3: ERROR
		.catch((err) => {
			res.send("error: " + err);
		});
});

router.post("/login", (req, res) => {
	User.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then((user) => {
			// CASE 1: USER LOGIN VALID, SEND TOKEN
			if (user) {
				if (bcrypt.compareSync(req.body.password, user.password)) {
					// JWT- Synchronous Sign with default (HMAC SHA256)
					let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
						expiresIn: 1440,
					});
					res.send(token);
				}
			} else {
				// CASE 2: USER LOGIN INVALID
				res.status(400).json({ error: "User does not exist" });
			}
		})
		// CASE 3: ERROR
		.catch((err) => {
			res.status(400).json({ error: err });
		});
});

router.get("/profile", (req, res) => {
	// JWT- verify a token symmetric - synchronous
	var decoded = jwt.verify(
		req.headers["authorization"],
		process.env.SECRET_KEY
	);

	User.findOne({
		where: {
			id: decoded.id,
		},
	})
		// CASE 1: USER PROFILE EXIST IN DB
		.then((user) => {
			if (user) {
				res.json(user);
			} else {
				// CASE 2: USER PROFILE DOES NOT EXIST IN DB
				res.send("User does not exist");
			}
		})
		// CASE 3: ERROR
		.catch((err) => {
			res.send("error: " + err);
		});
});

module.exports = router;
