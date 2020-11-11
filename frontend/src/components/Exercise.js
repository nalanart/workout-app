import './Exercise.css'

function Exercise({ exercise, session }) {

  let sessionNumber = session === 1 ? 'sessionOne' : 'sessionTwo'

  return (
    <ul>
      {exercises.map(exercise => (
        <li key={exercise._id}>
          <div className="exercise-details">
            <p>{exercise[sessionNumber].setsRegular}x{exercise[sessionNumber].repsRegular}</p>
            {exercise[sessionNumber].setsAmrap && <p>, {exercise[sessionNumber].setsAmrap}x{exercise[sessionNumber].repsAmrap}</p>}
            <p>{exercise.name}</p>
            {exercise.liftType !== 'accessory' ? null : <button>Swap</button>}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Exercise

return (
  <ul>
    {exercises.map(exercise => (
      !(exercise[sessionNum].setsRegular) ? null : <li key={exercise._id}>
        <p>{exercise[sessionNum].setsRegular}x{exercise[sessionNum].repsRegular}</p>
        {exercise[sessionNum].setsAmrap && <p>, {exercise[sessionNum].setsAmrap}x{exercise[sessionNum].repsAmrap}</p>}
        <p>{exercise.name}</p>
        {exercise.liftType !== 'accessory' ? null : <button>Swap</button>}
      </li>
    ))}
  </ul>
)