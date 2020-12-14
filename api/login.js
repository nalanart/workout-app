const loginRouter = require('express').Router()
const User = require('../models/User')
const { loginValidation } = require('../validation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

loginRouter.post('/', async (req, res) => {
  // Validate login fields
  const { error } = loginValidation(req.body)
  if(error) {
    return res.status(400).send(error.details[0].message)
  }
  try {
    // Check if email exists
    const user = await User.findOne({ email: req.body.email })
    if(!user) {
      return res.status(400).send('Email does not exist')
    }
    // Check if passwords match
    const match = await bcrypt.compare(req.body.password, user.password)
    if(!match) {
      return res.status(400).send('Invalid password')
    }
    // Create and assign a token
    const accessToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.json({ accessToken: accessToken, userId: user._id })
  } catch(err) {
    res.sendStatus(500)
  }
})

module.exports = loginRouter