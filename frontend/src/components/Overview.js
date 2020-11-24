import CompletedWorkout from "./CompletedWorkout"
import axios from 'axios'
import React, { useState, useEffect } from 'react'


function Overview({ day, handleSkip }) {

  const [latestWorkout, setLatestWorkout] = useState()

  useEffect(() => {
    async function getLatestWorkout() {
      const res = await axios.get(`/history?day=${day}`)
      setLatestWorkout(res.data[0])
    }

    try {
      getLatestWorkout()
    } catch(error) {
      throw error
    }
  }, [])

  if(!latestWorkout) {
    return <p>You don't have any previously completed {day} workouts! GET TO WORK!!!!!!!!!!!</p>
  }

  return (
    <div className="Overview">
      {day === 'rest' ? (
      <div className="rest-day">
        <p>Good job on your workouts! Rest up today!</p>
        <button onClick={handleSkip}>Rest is for the weak</button>
      </div>) : (
      <div className="non-rest-day">
        <h2>You are doing {day} today!</h2>
        <h3>Last time you did {day}:</h3>
        <CompletedWorkout workout={latestWorkout}/>
        <p>Not feeling like {day} today? That's okay, skip to next day</p>
        <button onClick={handleSkip}>Skip</button>
      </div>
      )}
    </div>
  )
}

export default Overview