import { useState, useEffect } from 'react'
import CompletedWorkout from './CompletedWorkout'
const axios = require('axios')


function History() {

  const [workoutHistory, setWorkoutHistory] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/history')
      setWorkoutHistory(res.data)
    }

    try{
      fetchData()
    } catch(error) {
      throw error
    }
    
  }, [])

  if(!workoutHistory) {
    return <p>Loading...</p>
  }

  return (
    <div className="History">
      <h2>Workout History</h2>
      {workoutHistory.map(workout => <CompletedWorkout key={workout._id} workout={workout} />)}
    </div>
  )
}

export default History