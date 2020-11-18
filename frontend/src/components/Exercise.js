function Exercise({ exercise }) {
  return (
    <div className="Exercise">
      <p>{exercise.name} @ {exercise.weight}</p>
      <p>Sets: {exercise.reps.join('-')}</p>
    </div>
  )
}

export default Exercise