const config = process.env;
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const router = express.Router();


router.post("/register", async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;

        if (!(email && password && name && lastname)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            lastname,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            config.JWT_SECRET,
            {
              expiresIn: "2h",
            }
        );
        
        user.token = token;

        res.status(201).json(user);

    } catch (error) {
        console.log(error);
    }
}) 

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!(email && password)) {
			res.status(400).send("All input is required");
		}
	
		const user = await User.findOne({ email });

		if (!user) {
			res.status(400).send("Invalid Credentials");
		}

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ user_id: user._id, email },
				config.JWT_SECRET,
				{
					expiresIn: "2h",
				}
			);

			user.token = token;
			res.status(200).json(user);
		}
	} catch (err) {
		console.log(err);
	}
})

module.exports = router;
