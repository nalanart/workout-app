const router = require('express').Router()
const exercisesRouter = require('./exercises')
const historyRouter = require('./history')

router.use('/history', historyRouter)
router.use('/exercises', exercisesRouter)

module.exports = router