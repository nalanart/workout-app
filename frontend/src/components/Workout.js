import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import './Workout.css'

let today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0
const yyyy = today.getFullYear()
today = `${mm}/${dd}/${yyyy}`

const parseJwt = token => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}

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
      await axios.post('/history', completedWorkout, {
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
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
    const user = parseJwt(localStorage.getItem('accessToken'))

    setCompletedWorkout({
      userId: user._id,
      date: today,
      day: workout.mains[0].day,
      exercises: completedExercises
    })

    goNextDay()
  }

  if(Object.keys(workout).length === 0) {
    return <p>No workout planned yet</p>
  }

  return ( 
    <div className="Workout-container">
      <h2>Today's Date: {today}</h2>
      <table className="table">
        <thead>
          <tr>
            <th><h5>Exercise</h5></th>
            <th className="set-number">Set 1</th>
            <th className="set-number">Set 2</th>
            <th className="set-number">Set 3</th>
            <th className="set-number">Set 4</th>
            <th className="set-number">Set 5</th>
            <th></th>
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
                <input type="number" onChange={e => handleChange2(e, 4)} disabled={exercise !== currentExercise.current || exercise[session].setsRegular < 4} />
              </td>
              <td className="reps">
                <input type="number" onChange={e => handleChange2(e, 5)} 
                                     disabled={exercise !== currentExercise.current || exercise[session].setsRegular + exercise[session].setsAmrap < 5} />
              </td>
              <button className="btn btn-info" onClick={() => handleSubmit(index)} disabled={exercise !== currentExercise.current}>Done</button>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-finish" onClick={postWorkout}>Finish Workout</button>
    </div>
  )
}

export default Workout