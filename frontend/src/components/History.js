import { useState, useEffect } from 'react'
import CompletedWorkout from './CompletedWorkout'
import './History.css'
const axios = require('axios')


function History() {

  const [limit, setLimit] = useState(6)
  const [workoutHistory, setWorkoutHistory] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`/history?limit=${limit}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
      setWorkoutHistory(res.data)
    }

    try{
      fetchData()
    } catch(error) {
      throw error
    }
    
  }, [limit])

  if(!workoutHistory) {
    return <p>Loading...</p>
  }

  return (
    <div className="History-container">
      <h1>Workout History</h1>
      <div className="workouts-container">
        {workoutHistory.map(workout => <CompletedWorkout key={workout._id} workout={workout} />)}
      </div>
      <button className="button-load-more" onClick={() => setLimit(prev => prev + 6)}>Load more</button>
    </div>
  )
}

export default History