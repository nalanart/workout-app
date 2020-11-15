const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
  mains: Array,
  accessories: Array
})

const Workout = mongoose.model('Workout', workoutSchema, 'workouts')

module.exports = Workout