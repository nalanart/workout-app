import axios from 'axios'
import { useState, useEffect } from 'react'

function Workout({ match }) {

  const [workout, setWorkout] = useState({})

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null
  })

  const [reps, setReps] = useState()

  useEffect(() => {
    axios.get(`/workouts/${match.params.workoutId}`).then(res => {
      setWorkout(res.data)
    })
  }, [match.params.workoutId])

  const onEdit = ({id, currentReps}) => {
    setInEditMode({
      status: true,
      rowKey: id
    })

    setReps(currentReps)
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null
    })
    
    setReps(null)
  }

  const updateWorkout = ({id, newReps}) => {

  }

  const onSave = ({id, newReps}) => {

  }

  if(Object.keys(workout).length === 0) {
    return <p>Loading...</p>
  }

  return ( 
    <div>
      <h1>Today's Date</h1>
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
        </thead>
        <tbody>
          {workout.mains.map(main => (
            <tr key={main._id}>
              <td>
                {main.name}
              </td>
              <td>
                <input type="number" />
              </td>
              <td>
              <input type="number" />
              </td>
              <td>
              <input type="number" />
              </td>
              <td>
              <input type="number" />
              </td>
              <td>
              <input type="number" />
              </td>
            </tr>
          ))}
          {workout.accessories.map(accessory => (
            <tr key={accessory._id}>
              <td>
                {accessory.name}
              </td>
              <td>
              <input type="number" />
              </td>
              <td>
              <input type="number" />
              </td>
              <td>
              <input type="number" />
              </td>
              <td>
              <input type="number" />
              </td>
              <td>
              <input type="number" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Workout