const workoutsRouter = require('express').Router()
const mongoose = require('mongoose')
const Workout = require('../models/Workout')

workoutsRouter.param('workoutId', async (req, res, next, workoutId) => {
  try {
    await mongoose.connect('mongodb+srv://nalanart:ttyDPj9vx2sDNJqn@cluster0.2iplh.mongodb.net/workout-app-db?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true })

    const workout = await Workout.findById(workoutId).exec()

    if(Object.keys(workout).length === 0) {
      res.sendStatus(404)
    } else {
      req.workout = workout
      next()
    }

  } catch(error) {
    throw error
  }
  
})

workoutsRouter.get('/', async (req, res) => {
  try {
    await mongoose.connect('mongodb+srv://nalanart:ttyDPj9vx2sDNJqn@cluster0.2iplh.mongodb.net/workout-app-db?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true })

    const workouts = await Workout.find({})

    res.send(workouts)

  } catch(error) {
    throw error
  }

})

workoutsRouter.post('/', async (req, res) => {
  try {
    await mongoose.connect('mongodb+srv://nalanart:ttyDPj9vx2sDNJqn@cluster0.2iplh.mongodb.net/workout-app-db?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true })

    const workout = await Workout.create({
      _id: new mongoose.Types.ObjectId().toHexString(),
      mains: req.body.mains,
      accessories: req.body.accessories
    })

    res.status(201).send(workout)

  } catch(error) {
    throw error
  }
  
})

workoutsRouter.get('/:workoutId', (req, res) => {
  res.send(req.workout)
})

module.exports = workoutsRouter