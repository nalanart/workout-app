const router = require('express').Router()
const exercisesRouter = require('./exercises')
const historyRouter = require('./history')
const loginRouter = require('./login')
const registerRouter = require('./register')
const usersRouter = require('./users')
const authRouter = require('./auth')

router.use('/history', historyRouter)
router.use('/exercises', exercisesRouter)
router.use('/login', loginRouter)
router.use('/register', registerRouter)
router.use('/users', usersRouter)
router.use('/auth', authRouter)

module.exports = router