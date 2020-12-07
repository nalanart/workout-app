import './Exercise.css'

function Exercise({ exercise }) {
  return (
    <div className="Exercise">
      <p className="card-text">{exercise.name} @ {exercise.weight} lbs</p>
      <p className="card-text">Sets: {exercise.reps.join('-')}</p>
    </div>
  )
}

export default Exercise