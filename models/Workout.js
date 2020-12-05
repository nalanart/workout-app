const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
  _id: String,
  mains: Array,
  accessories: Array
}, { _id: false })

const Workout = mongoose.model('Workout', workoutSchema, 'workouts')

module.exports = Workout