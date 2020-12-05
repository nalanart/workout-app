const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  name: {type: String, required: true},
  day: {type: String, required: true},
  liftType: {type: String, default: 'accessory'},
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
  weight: {type: Number, default: 0},
  failCount: {type: Number, default: 0},
  reps: [Number]
})

const Exercise = mongoose.model('Exercise', exerciseSchema, 'exercises')

module.exports = Exercise