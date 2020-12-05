const mongoose = require('mongoose')

const completedWorkoutSchema = new mongoose.Schema({
  date: String,
  day: String,
  exercises: Array
})

const CompletedWorkout = mongoose.model('CompletedWorkout', completedWorkoutSchema, 'completedWorkouts')

module.exports = CompletedWorkout