import { useState, useEffect } from 'react'
import CompletedWorkout from './CompletedWorkout'
import './History.css'
const axios = require('axios')


function History() {

  const [workoutHistory, setWorkoutHistory] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('/history')
      setWorkoutHistory(res.data)
      let today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0
      const yyyy = today.getFullYear()
      today = `${mm}/${dd}/${yyyy}`
      console.log(today)
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
    <div className="History-container">
      <h2>Workout History</h2>
      <div className="workouts-container">
        {workoutHistory.map(workout => <CompletedWorkout key={workout._id} workout={workout} />).sort((a, b) => a.date - b.date)}
      </div>
    </div>
  )
}

export default History