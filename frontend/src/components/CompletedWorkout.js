import Exercise from './Exercise'
import './CompletedWorkout.css'

function CompletedWorkout({ workout }) {
  return (
    <div className="CompletedWorkout">
      <p>Date: {workout.date}</p>
      <p>Day: {workout.day}</p>
      {workout.exercises.map(exercise => <Exercise key={exercise._id} exercise={exercise} />)}
    </div>
  )
}

export default CompletedWorkout