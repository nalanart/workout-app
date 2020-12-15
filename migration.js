const Exercise = require('./models/Exercise')

const createStartingExercises = async userId => {
  try {
    await Exercise.create({
      userId: userId,
      name: 'bench-press',
      day: 'push',
      liftType: 'main',
      sessionOne: {
        setsRegular: '4',
        repsRegular: '5',
        setsAmrap: '1',
        repsAmrap: '5'
      },
      sessionTwo: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'overhead-press',
      day: 'push',
      liftType: 'main',
      sessionOne: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '4',
        repsRegular: '5',
        setsAmrap: '1',
        repsAmrap: '5'
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'barbell-row',
      day: 'pull',
      liftType: 'main',
      sessionOne: {
        setsRegular: '',
        repsRegular: '',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '4',
        repsRegular: '5',
        setsAmrap: '1',
        repsAmrap: '5'
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'squat',
      day: 'legs',
      liftType: 'main',
      sessionOne: {
        setsRegular: '2',
        repsRegular: '5',
        setsAmrap: '1',
        repsAmrap: '5'
      },
      sessionTwo: {
        setsRegular: '2',
        repsRegular: '5',
        setsAmrap: '1',
        repsAmrap: '5'
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'seated-cable-row',
      day: 'pull',
      liftType: 'accessory',
      sessionOne: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'tricep-pushdown',
      day: 'push',
      liftType: 'accessory',
      sessionOne: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'leg-press',
      day: 'legs',
      liftType: 'accessory',
      sessionOne: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'incline-dumbbell-press',
      day: 'push',
      liftType: 'accessory',
      sessionOne: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'lateral-raise',
      day: 'push',
      liftType: 'accessory',
      sessionOne: {
        setsRegular: '3',
        repsRegular: '15-20',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '3',
        repsRegular: '15-20',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'overhead-tricep-extension',
      day: 'push',
      liftType: 'accessory',
      sessionOne: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'face-pull',
      day: 'pull',
      liftType: 'accessory',
      sessionOne: {
        setsRegular: '5',
        repsRegular: '15-20',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '5',
        repsRegular: '15-20',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'hammer-curl',
      day: 'pull',
      liftType: 'accessory',
      sessionOne: {
        setsRegular: '4',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '4',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'dumbbell-curl',
      day: 'pull',
      liftType: 'accessory',
      sessionOne: {
        setsRegular: '4',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '4',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'leg-curl',
      day: 'legs',
      liftType: 'accessory',
      sessionOne: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'romanian-deadlift',
      day: 'legs',
      liftType: 'accessory',
      sessionOne: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'calf-raise',
      day: 'legs',
      liftType: 'accessory',
      sessionOne: {
        setsRegular: '5',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '5',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'deadlift',
      day: 'pull',
      liftType: 'main',
      sessionOne: {
        setsRegular: '4',
        repsRegular: '5',
        setsAmrap: '1',
        repsAmrap: '5'
      },
      sessionTwo: {
        setsRegular: '',
        repsRegular: '',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
    await Exercise.create({
      userId: userId,
      name: 'pullup',
      day: 'pull',
      liftType: 'accessory',
      sessionOne: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      sessionTwo: {
        setsRegular: '3',
        repsRegular: '8-12',
        setsAmrap: '',
        repsAmrap: ''
      },
      weight: 0,
      failCount: 0
    })
  } catch(error) {
    throw new Error('Error creating exercise')
  }
}

module.exports = createStartingExercises