const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  name: String,
  day: String,
  liftType: String,
  sessionOne: {
    setsRegular: String,
    repsRegular: String,
    setsAmrap: String, 
    repsAmrap: String
  },
  sessionTwo: {
    setsRegular: String,
    repsRegular: String,
    setsAmrap: String, 
    repsAmrap: String
  },
  weight: Number,
  currentExercise: { type: Boolean, default: false }
})

const Exercise = mongoose.model('Exercise', exerciseSchema, 'exercises')

module.exports = Exercise