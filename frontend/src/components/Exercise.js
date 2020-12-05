function Exercise({ exercise }) {
  return (
    <div className="Exercise">
      <p>{exercise.name} @ {exercise.weight} lbs</p>
      <p>Sets: {exercise.reps.join('-')}</p>
    </div>
  )
}

export default Exercise