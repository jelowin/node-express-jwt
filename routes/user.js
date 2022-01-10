const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const User = require('../models/user')

const router = express.Router()

router.use(authMiddleware)
router.get('/getUsers', async (req, res) => {
  try {
    const users = await User.find({})

    if (!users) {
      return res.status(204).send()
    }

    return res.status(201).json(users)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
