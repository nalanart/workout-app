const router = require('express').Router()
const exercisesRouter = require('./exercises')
const historyRouter = require('./history')
const loginRouter = require('./login')
const registerRouter = require('./register')

router.use('/history', historyRouter)
router.use('/exercises', exercisesRouter)
router.use('/login', loginRouter)
router.use('/register', registerRouter)

module.exports = router