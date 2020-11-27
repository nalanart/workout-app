const exercisesRouter = require('express').Router()
const mongoose = require('mongoose')
const Exercise = require('../models/Exercise')

exercisesRouter.param('exerciseId', async (req, res, next, exerciseId) => {
  try {
    await mongoose.connect('mongodb+srv://nalanart:ttyDPj9vx2sDNJqn@cluster0.2iplh.mongodb.net/workout-app-db?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true })

    const exercise = await Exercise.findById(exerciseId).exec()

    if(exercise === null) {
      res.sendStatus(404)
    } else {
      req.exercise = exercise
      next()
    }
  } catch(error) {
    throw error
  }
})

exercisesRouter.get('/', async (req, res) => {
  try {
    await mongoose.connect('mongodb+srv://nalanart:ttyDPj9vx2sDNJqn@cluster0.2iplh.mongodb.net/workout-app-db?retryWrites=true&w=majority', { 
      useNewUrlParser: true, useUnifiedTopology: true 
    })

    const exercises = await Exercise.find({ day: req.query.day, liftType: req.query.liftType }).exec()

    if(exercises === null) {
      res.sendStatus(404)
    } else {
      res.send(exercises)
    }
  } catch(error) {
    throw error
  }
})

exercisesRouter.post('/', async (req, res) => {
  try {
    await mongoose.connect('mongodb+srv://nalanart:ttyDPj9vx2sDNJqn@cluster0.2iplh.mongodb.net/workout-app-db?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true })
    
    await Exercise.create({
      name: req.body.name,
      day: req.body.day,
      liftType: req.body.liftType,
      sessionOne: req.body.sessionOne,
      sessionTwo: req.body.sessionTwo
    })

    res.sendStatus(201)

  } catch(error) {
    throw error
  }
})

exercisesRouter.get('/:exerciseId', (req, res) => {
  res.send(req.exercise)
})

exercisesRouter.put('/:exerciseId', async (req, res) => {
  try {
    await mongoose.connect('mongodb+srv://nalanart:ttyDPj9vx2sDNJqn@cluster0.2iplh.mongodb.net/workout-app-db?retryWrites=true&w=majority', 
    { useNewUrlParser: true, useUnifiedTopology: true })

    await Exercise.findByIdAndUpdate(req.params.exerciseId, {
      name: req.body.name,
      sessionOne: req.body.sessionOne,
      sessionTwo: req.body.sessionTwo,
      weight: req.body.weight,
      reps: req.body.reps
    })

    res.sendStatus(204)

  } catch(error) {
    throw error
  }
})

module.exports = exercisesRouter