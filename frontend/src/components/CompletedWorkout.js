import Exercise from './Exercise'
import './CompletedWorkout.css'

function CompletedWorkout({ workout }) {
  return (
    <div className="card CompletedWorkout">
      <div className="card-body">
        <h5 className="card-title date">Date: {workout.date}</h5>
        <h6 className="card-subtitle text-muted">Day: {workout.day}</h6>
        {workout.exercises.map(exercise => <Exercise key={exercise._id} exercise={exercise} />)}
      </div>
    </div>
  )
}

export default CompletedWorkout