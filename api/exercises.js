const exercisesRouter = require('express').Router()
const Exercise = require('../models/Exercise')
const authenticateToken = require('../authToken')

exercisesRouter.param('exerciseId', async (req, res, next, exerciseId) => {
  try {
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

exercisesRouter.get('/', authenticateToken, async (req, res) => {
  try {
    console.log(req.user)
    const exercises = await Exercise.find({ day: req.query.day, liftType: req.query.liftType }).exec()
    if(!exercises.length) {
      res.sendStatus(404)
    } else {
      res.send(exercises.filter(exercise => exercise.userId === req.user._id))
    }
  } catch(error) {
    throw error
  }
})

exercisesRouter.post('/', authenticateToken, async (req, res) => {
  try {
    await Exercise.create({
      userId: req.user._id,
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
    await Exercise.findByIdAndUpdate(req.params.exerciseId, {
      name: req.body.name,
      sessionOne: req.body.sessionOne,
      sessionTwo: req.body.sessionTwo,
      weight: req.body.weight,
      failCount: req.body.failCount,
      reps: req.body.reps
    })
    res.sendStatus(204)
  } catch(error) {
    throw error
  }
})

exercisesRouter.delete('/:exerciseId', async(req, res) => {
  try {
    const removedExercise = await Exercise.findByIdAndDelete(req.params.exerciseId)
    if(removedExercise) {
      return res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch(error) {
    throw error
  }
})

module.exports = exercisesRouter