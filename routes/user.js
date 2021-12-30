const express = require("express");
const authMiddleware = require("../middleware/auth");
const User = require("../model/user");

const router = express.Router();

router.use(authMiddleware);
router.get("/getUsers", async (req, res) => {
    try {

        const users = await User.find({});

        if (!users) {
        	return res.status(204).send();
        }

        res.status(201).json(users);

    } catch (error) {
        console.log(error);
    }
}) 

module.exports = router;
