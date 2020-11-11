const exercisesRouter = require('express').Router()
const mongoose = require('mongoose')
const Exercise = require('../models/Exercise')

exercisesRouter.get('/', async (req, res) => {
  await mongoose.connect('mongodb+srv://nalanart:ttyDPj9vx2sDNJqn@cluster0.2iplh.mongodb.net/workout-app-db?retryWrites=true&w=majority', 
  { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log(`connected to DB`)
  })

  Exercise.find({ day: req.query.day, liftType: req.query.liftType }, (err, collection) => {
    if(err) {
      throw err
    } else {
      res.send(collection)
    }
  })



})

module.exports = exercisesRouter