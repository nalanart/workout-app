import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import './Workout.css'

function Workout({ workout, session, goNextDay, failedExercise }) {
  const [completedExercise, setCompletedExercise] = useState({
    reps: []
  })
  const [completedExercises, setCompletedExercises] = useState([])

  const [allExercises, setAllExercises] = useState([])

  const [completedWorkout, setCompletedWorkout] = useState({})

  const initialPost = useRef(false)

  const currentExercise = useRef(null)

  useEffect(() => {
    if(Object.keys(workout).length !== 0) {
      currentExercise.current = workout.mains[0]
      setAllExercises(workout.mains.concat(workout.accessories))
    }
  }, [workout])

  useEffect(() => {
    async function submitWorkout() {
      await axios.post('/history', completedWorkout)
    }

    if(initialPost.current) {
      try {
        submitWorkout()
      } catch(error) {
        throw error
      }

      initialPost.current = false
    }
  }, [completedWorkout])

  const handleChange1 = (event, exercise) => {
    const { value } = event.target
    setCompletedExercise(prev => {
      prev.reps.splice(0, 1, Number(value))
      return {
        ...exercise,
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

  useEffect(() => {
    const updateFailCount = async () => {
      await axios.put(`/exercises/${completedExercise._id}`, completedExercise)
    }

    if(initialPost.current) {
      try {
        updateFailCount()
        setCompletedExercises(prev => [...prev, completedExercise])
        setCompletedExercise({
          reps: []
        })
      } catch(error) {
        throw error
      }
    }
    initialPost.current = false
  }, [completedExercise])

  const handleSubmit = async index => {
    currentExercise.current = allExercises[index + 1]
    initialPost.current = true
    setCompletedExercise(prev => {
      if(failedExercise(completedExercise)) {
        if(completedExercise.failCount === 2) {
          return {
            ...prev,
            weight: Math.floor(0.9 * completedExercise.weight / 5) * 5,
            failCount: 0
          }
        } else {
          return {
            ...prev,
            failCount: completedExercise.failCount++
          }
        }
      } else {
        return {
          ...prev,
          weight: completedExercise.weight + (completedExercise.name === 'deadlift' ? 10 : 5),
          failCount: 0
        }
      }
    })
  }

  const postWorkout = () => {
    initialPost.current = true

    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0
    const yyyy = today.getFullYear()
    today = `${mm}/${dd}/${yyyy}`
    console.log(today)
    setCompletedWorkout({
      date: today,
      day: workout.mains[0].day,
      exercises: completedExercises
    })

    goNextDay()
  }

  if(Object.keys(workout).length === 0) {
    return <p>Loading...</p>
  }

  return ( 
    <div className="Workout-container">
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
                <p>{exercise[session].setsRegular}x{exercise[session].repsRegular}</p>
                {exercise[session].setsAmrap && <p>, {exercise[session].setsAmrap}x{exercise[session].repsAmrap}+ </p>}
                <p> {exercise.name} @ {exercise.weight ? exercise.weight : 0} lbs</p>
              </td>
              <td className="reps">
                <input type="number" onChange={e => handleChange1(e, exercise)} disabled={exercise !== currentExercise.current} />
              </td>
              <td className="reps">
                <input type="number" onChange={e => handleChange2(e, 2)} disabled={exercise !== currentExercise.current} />
              </td>
              <td className="reps">
                <input type="number" onChange={e => handleChange2(e, 3)} disabled={exercise !== currentExercise.current} />
              </td>
              <td className="reps">
                <input type="number" onChange={e => handleChange2(e, 4)} disabled={exercise !== currentExercise.current || exercise.sessionOne.setsRegular < 4} />
              </td>
              <td className="reps">
                <input type="number" onChange={e => handleChange2(e, 5)} 
                                     disabled={exercise !== currentExercise.current || exercise.sessionOne.setsRegular + exercise.sessionOne.setsAmrap < 5} />
              </td>
              <button onClick={() => handleSubmit(index)} disabled={exercise !== currentExercise.current}>Done</button>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={postWorkout}>Finish Workout</button>
    </div>
  )
}

export default Workout