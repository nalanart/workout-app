const router = require('express').Router()
const exercisesRouter = require('./exercises')
const historyRouter = require('./history')
const workoutsRouter = require('./workouts')
const path = require('path')

router.use('/history', historyRouter)
router.use('/exercises', exercisesRouter)
router.use('/workouts', workoutsRouter)

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/frontend/public/index.html'))
})

// router.get('/', (req, res) => {
//   res.send('Home page')
// })

module.exports = router