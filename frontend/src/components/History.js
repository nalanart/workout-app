import { useState, useEffect } from 'react'
import CompletedWorkout from './CompletedWorkout'
import './History.css'
const axios = require('axios')


function History() {

  const [limit, setLimit] = useState(12)
  const [workoutHistory, setWorkoutHistory] = useState([])
  const [pushHistory, setPushHistory] = useState([])
  const [pullHistory, setPullHistory] = useState([])
  const [legsHistory, setLegsHistory] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`/history?limit=${limit}`, {
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
      setWorkoutHistory(res.data)
      setPushHistory(res.data.filter(workout => workout.day === 'push'))
      setPullHistory(res.data.filter(workout => workout.day === 'pull'))
      setLegsHistory(res.data.filter(workout => workout.day === 'legs'))
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
        <div className="row">
          <div className="col-4">
            <h3>Push</h3>
          {pushHistory.map(workout => <CompletedWorkout key={workout._id} workout={workout} />)}
          </div>
          <div className="col-4">
            <h3>Pull</h3>
          {pullHistory.map(workout => <CompletedWorkout key={workout._id} workout={workout} />)}
          </div>
          <div className="col-4">
            <h3>Legs</h3>
          {legsHistory.map(workout => <CompletedWorkout key={workout._id} workout={workout} />)}
          </div>
        </div>
      </div>
      <button className="btn btn-load-more" onClick={() => setLimit(limit + 12)}>Load more</button>
    </div>
  )
}

export default History