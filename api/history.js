const historyRouter = require('express').Router()
const CompletedWorkout = require('../models/CompletedWorkout')
const authenticateToken = require('../authToken')

historyRouter.param('completedId', async (req, res, next, completedId) => {
  try {
    const completedWorkout = await Workout.findById(completedId).exec()
    if(Object.keys(workout).length === 0) {
      res.sendStatus(404)
    } else {
      req.completedWorkout = completedWorkout
      next()
    }
  } catch(error) {
    throw error
  }
})

historyRouter.get('/', authenticateToken, async (req, res) => {
  let day = req.query.day

  try {
    if(!day) {
      const completedWorkouts = await CompletedWorkout.find({}).sort({ 'date': -1 }).limit(Number(req.query.limit)).exec()
      if(completedWorkouts.length) {
        res.json(completedWorkouts.filter(workout => workout.userId === req.user._id))
      } else {
        res.sendStatus(404)
      }
    } else {
      const latestWorkoutOfTypeDay = await CompletedWorkout.findOne({ day: day, userId: req.user._id }).exec()
      console.log(latestWorkoutOfTypeDay)
      if(latestWorkoutOfTypeDay) {
        res.json(latestWorkoutOfTypeDay)
      } else {
        res.sendStatus(404)
      }
    }
  } catch(error) {
    throw error
  }
})

historyRouter.post('/', authenticateToken, async (req, res) => {
  try {
    const completedWorkout = await CompletedWorkout.create({
      userId: req.user._id,
      date: req.body.date,
      day: req.body.day,
      exercises: req.body.exercises
    })
    res.status(201).send(completedWorkout)
  } catch(error) {
    throw error
  }
})

historyRouter.get('/:completedId', (req, res) => {
  res.send(req.completedWorkout)
})

module.exports = historyRouter