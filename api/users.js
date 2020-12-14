const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.param('userId', async (req, res, next, userId) => {
  try {
    const user = await User.findById(userId).exec()
    console.log(user)
    if(!user._id) {
      return res.status(404).send('User not found')
    } 
    req.user = user
    next()
  } catch(err) {

  }
})

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.find({}).exec()
    if(!users.length) {
      return res.status(404).send('No users found')
    }
    res.send(users)
  } catch(err) {
    res.sendStatus(500)
  }
})

usersRouter.get('/:userId', (req, res) => {
  res.json(req.user)
})

module.exports = usersRouter