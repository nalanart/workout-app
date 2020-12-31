const authRouter = require('express').Router()
const authenticateToken = require('../authToken')

module.exports = authRouter.get('/', authenticateToken, async(req, res) => {
  try {
    res.json(true)
  } catch (error) {
    console.log(err.message)
    res.status(500).send("Server Error")
  }
})