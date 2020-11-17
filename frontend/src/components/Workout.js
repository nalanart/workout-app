import axios from 'axios'
import { useState, useEffect } from 'react'
import './Workout.css'

function Workout({ match }) {

  const [workout, setWorkout] = useState({})

  const [completedExercise, setCompletedExercise] = useState({
    reps: [null, null, null, null, null]
  })
  const [completedExercises, setCompletedExercises] = useState([])

  const [allExercises, setAllExercises] = useState([])

  useEffect(() => {
    axios.get(`/workouts/${match.params.workoutId}`).then(res => {
      setWorkout(res.data)
      setAllExercises(res.data.mains.concat(res.data.accessories))
    })

  }, [])

  const handleChange1 = (event, exercise) => {
    const { value } = event.target
    setCompletedExercise(prev => {
      prev.reps.splice(0, 1, Number(value))
      return {
        ...prev,
        name: exercise.name,
        reps: prev.reps
      }
    })
  }
  const handleChange2 = ({ target }, col) => {
    const { value } = target
    setCompletedExercise(prev => {
      prev.reps.splice(col - 1, 1, Number(value))
      return {
        ...prev,
        reps: prev.reps
      }
    })
  }

  const handleSubmit = (currentId, index) => {
    if(index === allExercises.length - 1) {
      setAllExercises(prev => {
        prev.splice(index, 1, {
          ...prev[index],
          currentExercise: false
        })
        return prev
      })
    } else {
      setAllExercises(prev => {
        prev.splice(index, 1, {
          ...prev[index],
          currentExercise: false
        })
        prev.splice(index + 1, 1, {
          ...prev[index + 1],
          currentExercise: true
        })
        return prev
      })
    }

    setCompletedExercises(prev => [...prev, completedExercise])
    setCompletedExercise({
      reps: [null, null, null, null, null]
    })
  }

  if(Object.keys(workout).length === 0) {
    return <p>Loading...</p>
  }

  return ( 
    <div className="Workout">
      <h1>Today's Date</h1>
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th className="set-number">1</th>
            <th className="set-number">2</th>
            <th className="set-number">3</th>
            <th className="set-number">4</th>
            <th className="set-number">5</th>
          </tr>
        </thead>
        <tbody>
          {allExercises.map((exercise, index) => (
            <tr key={exercise._id}>
              <td>
                {exercise.name} @ {exercise.weight}
              </td>
              <td>
                <input type="number" onChange={e => handleChange1(e, exercise)} disabled={!exercise.currentExercise} />
              </td>
              <td>
                <input type="number" onChange={e => handleChange2(e, 2)} disabled={!exercise.currentExercise} />
              </td>
              <td>
                <input type="number" onChange={e => handleChange2(e, 3)} disabled={!exercise.currentExercise} />
              </td>
              <td>
                <input type="number" onChange={e => handleChange2(e, 4)} disabled={!exercise.currentExercise} />
              </td>
              <td>
                <input type="number" onChange={e => handleChange2(e, 5)} disabled={!exercise.currentExercise} />
              </td>
              <button onClick={() => handleSubmit(exercise._id, index)} disabled={!exercise.currentExercise}>Done</button>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Finish Workout</button>
    </div>
  )
}

export default Workout