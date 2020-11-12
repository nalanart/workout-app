const exercisesRouter = require('express').Router()
const mongoose = require('mongoose')
const Exercise = require('../models/Exercise')

exercisesRouter.get('/', async (req, res) => {
  await mongoose.connect('mongodb+srv://nalanart:ttyDPj9vx2sDNJqn@cluster0.2iplh.mongodb.net/workout-app-db?retryWrites=true&w=majority', 
  { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log(`connected to DB`)
  })

  await Exercise.find({ day: req.query.day, liftType: req.query.liftType }, (err, collection) => {
    if(err) {
      throw err
    } else {
      res.send(collection)
    }
  })

})

exercisesRouter.post('/', async (req, res) => {
  await mongoose.connect('mongodb+srv://nalanart:ttyDPj9vx2sDNJqn@cluster0.2iplh.mongodb.net/workout-app-db?retryWrites=true&w=majority', 
  { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log(`connected to DB`)
  })

  await Exercise.create({
    name: req.body.name,
    day: req.body.day,
    liftType: req.body.liftType,
    sessionOne: req.body.sessionOne,
    sessionTwo: req.body.sessionTwo
  }, err => {
    if(err) {
      throw err
    } else {
      res.sendStatus(201)
    }
  })

})

module.exports = exercisesRouter