const registerRouter = require('express').Router()
const mongoose = require('mongoose')
const User = require('../models/User')
const dotenv = require('dotenv')
const { registerValidation } = require('../validation')
const bcrypt = require('bcrypt')

dotenv.config()

registerRouter.post('/', async (req, res) => {
  // Validate submitted registration form
  const { error } = registerValidation(req.body)
  if(error) {
    return res.status(400).send(error.details[0].message)
  }
  try {
    await mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    // Check if email exists already
    const user = await User.findOne({ email: req.body.email })
    if(user) {
      return res.status(400).send('Email already exists')
    }
    // If not, begin registering user by hashing the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword
    })
    const savedUser = await newUser.save()
    res.send({ user: savedUser._id})
  } catch(error) {
    res.sendStatus(500)
  }
})

module.exports = registerRouter