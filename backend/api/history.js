const historyRouter = require('express').Router()
const mongoose = require('mongoose')
const CompletedWorkout = require('../models/CompletedWorkout')

historyRouter.param('completedId', async (req, res, next, completedId) => {
  try {
    await mongoose.connect('mongodb+srv://nalanart:ttyDPj9vx2sDNJqn@cluster0.2iplh.mongodb.net/workout-app-db?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true })

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

historyRouter.get('/', async (req, res) => {
  let day = req.query.day

  try {
    await mongoose.connect('mongodb+srv://nalanart:ttyDPj9vx2sDNJqn@cluster0.2iplh.mongodb.net/workout-app-db?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true })

    if(!day) {
      const completedWorkouts = await CompletedWorkout.find({}).sort({ 'date': -1 }).limit(Number(req.query.limit)).exec()
      if(completedWorkouts) {
        res.json(completedWorkouts)
      } else {
        res.sendStatus(404)
      }
    } else {
      const latestWorkoutOfTypeDay = await CompletedWorkout.findOne({ day: day }).exec()
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

historyRouter.post('/', async (req, res) => {
  try {
    await mongoose.connect('mongodb+srv://nalanart:ttyDPj9vx2sDNJqn@cluster0.2iplh.mongodb.net/workout-app-db?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true })

    const completedWorkout = await CompletedWorkout.create({
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