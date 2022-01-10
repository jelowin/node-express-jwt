const config = process.env
const bcrypt = require('bcrypt')
const express = require('express')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const router = express.Router()

router.post(
  '/register',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res, next) => {
    const errors = validationResult(req)

    try {
      // TODO Error handler middleware
      if (!errors.isEmpty() && errors.errors[0].param === 'email') {
        return res.status(400).send('Invalid email address. Please try again.')
      }

      if (!errors.isEmpty() && errors.errors[0].param === 'password') {
        return res
          .status(400)
          .send('Password must be longer than 6 characters.')
      }

      const { name, lastname, email, password } = req.body

      if (!(email && password && name && lastname)) {
        return res.status(400).send('All input is required')
      }

      const userFound = await User.findOne({ email })

      if (userFound) {
        return res.status(409).send('User Already Exist. Please Login')
      }

      const hashPassword = await bcrypt.hash(password.toString(), 10)

      const user = await User.create({
        name,
        lastname,
        email: email.toLowerCase(),
        password: hashPassword,
      })

      return res.status(201).json(user)
    } catch (error) {
      res.status(500).send('Server error')
    }
  }
)

router.post(
  '/login',
  body('email').isEmail().normalizeEmail(),
  async (req, res) => {
    const errors = validationResult(req)

    try {
      // TODO Error handler middleware
      if (!errors.isEmpty() && errors.errors[0].param === 'email') {
        return res.status(400).send('Invalid email address. Please try again.')
      }

      const { email, password } = req.body

      if (!(email && password)) {
        res.status(400).send('Email and password required')
      }

      const user = await User.findOne({ email })

      if (
        !user ||
        !(await bcrypt.compare(password.toString(), user.password))
      ) {
        res.status(401).send('Email or password is invalid')
      }

      if (await bcrypt.compare(password.toString(), user.password)) {
        const token = jwt.sign(
          { user_id: user._id, email },
          config.JWT_SECRET,
          {
            expiresIn: '2h',
          }
        )
        res.cookie('uid', token, {
          httpOnly: true,
          expire: new Date() + 9999,
          path: '/',
          sameSite: 'lax',
        })
        res.status(200).json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        })
      }
    } catch (err) {
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
